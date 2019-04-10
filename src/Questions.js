import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import Button from '@material-ui/core/Button';
import {withTheme} from '@material-ui/core/styles';

import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import classNames from 'classnames';
import isEmpty from 'lodash.isempty';
import Pica from 'pica';

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

function unanswered(value) {
    return isEmpty(value) || (value.every && value.every(isEmpty));
}

function Questions({get, classes={}, theme, ...props}) {
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

    function updatePages(survey) {
        props.setPages({
            pages: survey.visiblePages.map((page) => ({
                error: page.hasErrors(),
                name: page.name,
                title: page.title,
            }))
        });
    }

    return (
        <Survey.Survey
            {...props}
            onAfterRenderSurvey={updatePages}
            onCurrentPageChanged={(survey) => {
                if (get(state`pageNum`) !== survey.currentPageNo) {
                    props.setPage({pageNum: survey.currentPageNo});
                }
            }}
            onUpdateQuestionCssClasses={
                (survey, {question, cssClasses}) => {
                    // TODO: Support more CSS stuff?
                    cssClasses.preview =
                        classNames(cssClasses.preview, classes.ssPreview);
                }
            }
            onPageVisibleChanged={updatePages}
            onPageAdded={updatePages}
            onUploadFiles={async (survey, {files, callback}) => {
                // TODO: Support multiple files?
                let file = files[0];

                let res = await props.upload({file});

                callback('success', [{
                    file,
                    content: res.url,
                }]);
            }}
            onValueChanging={(survey, options) => {
                return;
                let {value, question} = options;
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
                props.setData({data: survey.data, foo: 1});
                setTimeout(() => updatePages(survey));
            }}
            completedHtml={
                ReactDOMServer.renderToString(props.completedHtml)
            }
            onAfterRenderQuestion={
                async (survey, {question, htmlElement}) => {
                    // Make errors show immediately
                    question.hasErrors(true);

                    // Try to autofill if unanswered
                    if (unanswered(question.value)) {
                        question.value = question.defaultValue;

                        let {autofill} = question;
                        if (autofill) {
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
                    }
                    if (question.cerebralbutton) {
                        let seq = get(sequences`${question.cerebralbutton}`);
                        ReactDOM.render(
                            <Button onClick={() => seq()}>
                                {question.title}
                            </Button>
                        , htmlElement);
                    }
                }
            }
        />
    );
}

export default connect(
    {
        json: state`questions`,
        init: sequences`initSurvey`,
        data: state`surveyData`,
        setData: sequences`setSurveyData`,
        currentPageNo: state`pageNum`,
        setPage: sequences`setSurveyPage`,
        setPages: sequences`setPages`,
        autofill: sequences`autofill`,
        upload: sequences`uploadScreenshot`,
    },
    withTheme(Questions)
);
