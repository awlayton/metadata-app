import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

// TODO: Handle this without having mui stuff in this class??
import {ThemeProvider} from '@material-ui/styles';

import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import Button from '@material-ui/core/Button';
import {withTheme} from '@material-ui/core/styles';

import debug from 'debug';

import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import classNames from 'classnames';
import Pica from 'pica';

import surveyModel from './surveyModel';

import acwidget from './autocompleteWidget';
import tbwidget from './tagboxWidget';

import unanswered from './unanswered';

Survey.CustomWidgetCollection.Instance.addCustomWidget(acwidget, 'property');
Survey.CustomWidgetCollection.Instance.addCustomWidget(tbwidget, 'customtype');

Survey.JsonObject.metaData.addProperty('question', {
    name: 'cerebralbutton',
});

Survey.JsonObject.metaData.addProperty('question', {
    name: 'autofill',
    default: false,
});

// Override imageWidth for file questions
Survey.JsonObject.metaData.addProperty('file', {
    name: 'imageWidth',
    default: '100%',
});

let pica = new Pica();

const info = debug('contxt:survey');
info.log = console.info.bind(console);

let loggers = {};
function logCB() {
    let [name, ...rest] = arguments;

    let logger = loggers[name] || info.extend(name);
    loggers[name] = logger;

    return logger(...rest);
}

class Questions extends Component {
    componentWillMount() {
        const {get, theme} = this.props;

        // Apply MUI theme to survey
        const {palette} = theme;
        let themeColors = Survey.StylesManager.ThemeColors['default'];
        themeColors['$main-color'] = palette.primary.main;
        themeColors['$main-hover-color'] = palette.primary.dark;
        themeColors['$text-color'] = palette.text.primary;
        themeColors['$header-color'] = palette.secondary.main;
        themeColors['$border-color'] = palette.divider;
        themeColors['$header-background-color'] = palette.secondary.main;
        themeColors['$body-background-color'] = palette.background.paper;
        themeColors['$body-container-background-color'] = palette.background.paper;
        themeColors['$inputs-background-color'] = palette.background.default;
        themeColors['$error-color'] = palette.error.main;
        themeColors['$error-background-color'] = palette.error.light;
        Survey.StylesManager.applyTheme('default');

        this.model = new Survey.Model(this.props.questions);
        surveyModel.model = this.model;

        // TODO: I'm sure this is isn't right with cerebral..
        let data = get(state`surveyData`);
        if (data) {
            this.model.data = data;
        }
        let pageNum = get(state`pageNum`);
        if (pageNum !== undefined) {
            this.model.currentPageNo = pageNum;
        }

        this.props.reaction('changePage',
            {
                pageNum: state`pageNum`,
            },
            ({pageNum}) => this.model.currentPageNo = pageNum
        );
        this.props.reaction('changeData',
            {
                data: state`surveyData`,
            },
            ({data}) => this.model.data = data
        );
        this.props.reaction('changeQuestions',
            {
                questions: state`questions`,
            },
            ({questions}) => {
                this.model = new Survey.Model(questions);
                surveyModel.model = this.model;
            }
        );

        this.updatePages(this.model);
        this.props.setData({data: this.model.data});
    }

    updatePages(survey) {
        this.props.setPages({
            pages: survey.visiblePages.map((page) => ({
                error: page.hasErrors(false, false),
                name: page.name,
                title: page.title,
            }))
        });
    }

    render() {
        const {get, theme, classes={}, ...props} = this.props;

        return (
            <Survey.Survey
                {...props}
                model={this.model}
                onCurrentPageChanged={(survey) => {
                    logCB('onCurrentPageChanged', `${survey.currentPageNo}`);

                    if (get(state`pageNum`) !== survey.currentPageNo) {
                        props.setPage({pageNum: survey.currentPageNo});
                    }
                }}
                onUpdateQuestionCssClasses={
                    (survey, {question, cssClasses}) => {
                        logCB('onUpdateQuestionCssClasses',
                                `${question.name}=%o`, cssClasses);

                        // TODO: Support more CSS stuff?
                        cssClasses.preview =
                            classNames(cssClasses.preview, classes.ssPreview);
                    }
                }
                onPageVisibleChanged={this.updatePages.bind(this)}
                onPageAdded={this.updatePages.bind(this)}
                onUploadFiles={async (survey, {files, callback}) => {
                    logCB('onUploadFiles', `%o`, files);

                    // TODO: Support multiple files?
                    let file = files[0];

                    let res = await props.upload({file});

                    callback('success', [{
                        file,
                        content: res.url,
                    }]);
                }}
                onValueChanging={(survey, {question, name, oldValue, value}) => {
                    logCB('onValueChanging', `%o ${name}=%o`, oldValue, value);

                    return;
                    if (question instanceof Survey.QuestionFileModel) {
                        (value || []).forEach((file, i) => {
                            if (!(file && file.content) || file.converted) {
                                return;
                            }

                            let img = new Image();
                            img.src = file.content;
                            let canvas = document.createElement('canvas');
                            // TODO: Too small, need to upload to photos etc...
                            canvas.width = 150;
                            // Maintain aspect ratio
                            canvas.height =
                                img.height * canvas.width / img.width;

                            const options = {
                                unsharpAmount: 80,
                                unsharpRadius: 0.6,
                                unsharpThreshold: 2,
                            };
                            pica.resize(img, canvas, options).then(() => {
                                let resized = {
                                    name: file.name,
                                    content: canvas.toDataURL(),
                                    type: 'image/png',
                                    converted: true
                                };

                                // You have to reassign question.value
                                // Stuff breaks if you assign question.value[i]
                                let value = question.value;
                                question.value = [];
                                value[i] = resized;
                                question.value = value;
                            });
                        });
                    }
                }}
                onValueChanged={(survey, {name, value, question}) => {
                    logCB('onValueChanged', `%o=%o`, question, value);

                    props.setData({data: survey.data, name, value});
                    // No idea why, but cerebral freaks out if I call this
                    // without the setTimeout...
                    setTimeout(() => this.updatePages(survey));
                }}
                onMatrixRowAdded={(survey, {question, rowIndex}) => {
                    logCB('onMatrixRowAdded', '%d %o', rowIndex, question);
                    setTimeout(() => this.updatePages(survey));
                }}
                onMatrixRowRemoved={(survey, {question, rowIndex}) => {
                    logCB('onMatrixRowRemoved', '%d %o', rowIndex, question);
                    setTimeout(() => this.updatePages(survey));
                }}
                onDynamicPanelItemValueChanged={
                    (survey, {question, value, itemIndex, itemValue}) => {
                        logCB('onDynamicPanelItemValueChanged', `%o=%o %o=%o`,
                                question, value, itemIndex, itemValue);
                    }
                }
                onMatrixCellValueChanged={
                    (survey, {question, value, columnName, row}) => {
                        logCB('onMatrixCellValueChanged', `%o=%o %s %s`,
                                question, value, columnName, row);
                    }
                }
                onValidateQuestion={
                    (survey, {question, name, value, error}) => {
                        logCB('onValidateQuestion', '%o %s %s %s',
                                question, name, value, error);
                    }
                }
                completedHtml={
                    ReactDOMServer.renderToString(
                        <ThemeProvider theme={theme}>
                            props.completedHtml
                        </ThemeProvider>
                    )
                }
                onQuestionAdded={(survey, options) => {
                    logCB('onQuestionAdded', '%o', options);
                }}
                onAfterRenderQuestion={
                    async (survey, {question, htmlElement}) => {
                        logCB('onAfterRenderQuestion', '%o', question);

                        /*
                        if (question.autocomplete) {
                            question.choices = [
                                new Survey.ItemValue('foo'),
                                new Survey.ItemValue('bar'),
                            ];
                        }*/

                        let {autofill} = question;
                        // Try to autofill if unanswered
                        if (unanswered(question.value) && autofill) {
                            if (typeof autofill === 'function') {
                                question.value = await autofill(question);
                            } else {
                                let seq = await props.autofill({
                                    // TODO: How to handle dynamic questions?
                                    question: question.name,
                                    autofill,
                                });
                                question.value = seq && seq.answer;
                            }
                        }

                        if (question.cerebralbutton) {
                            let seq = get(sequences`${question.cerebralbutton}`);
                            ReactDOM.render(
                                <ThemeProvider theme={theme}>
                                    <Button onClick={() => seq()}>
                                        {question.title}
                                    </Button>
                                </ThemeProvider>
                            , htmlElement);
                        }
                    }
                }
            />
        );
    }
}

export default connect(
    {
        questions: state`questions`,
        init: sequences`initSurvey`,
        data: state`surveyData`,
        setData: sequences`setSurveyData`,
        setPage: sequences`setSurveyPage`,
        currentPageNo: state`pageNum`,
        setPages: sequences`setPages`,
        autofill: sequences`autofill`,
        upload: sequences`uploadScreenshot`,
    },
    withTheme(Questions)
);

