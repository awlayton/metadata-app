import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import Button from '@material-ui/core/Button';
import {withTheme} from '@material-ui/core/styles';

import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import surveyModel from './surveyModel';

Survey.JsonObject.metaData.addProperty('question', {
    name: 'cerebralbutton',
});

class Questions extends Component {
    componentWillMount() {
        const {get, theme} = this.props;

        // Apply MUI theme to survey
        const {palette} = theme;
        let themeColors = Survey.StylesManager.ThemeColors['default'];
        themeColors["$main-color"] = palette.primary.main;
        themeColors["$main-hover-color"] = palette.primary.dark;
        themeColors["$text-color"] = palette.text.primary;
        themeColors["$header-color"] = palette.secondary.main;
        themeColors["$border-color"] = palette.divider;
        themeColors["$header-background-color"] = palette.secondary.main;
        themeColors["$body-background-color"] = palette.background.default;
        themeColors["$body-container-background-color"] = palette.background.paper;
        themeColors["$inputs-background-color"] = palette.background.paper;
        themeColors["$error-color"] = palette.error.main;
        themeColors["$error-background-color"] = palette.error.light;
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
        let {get, ...props} = this.props;
        return (
            <Survey.Survey
                {...props}
                model={this.model}
                onCurrentPageChanged={(survey) => {
                    if (get(state`pageNum`) !== survey.currentPageNo) {
                        props.setPage({pageNum: survey.currentPageNo});
                    }
                }}
                onPageVisibleChanged={this.updatePages.bind(this)}
                onPageAdded={this.updatePages.bind(this)}
                onValueChanged={(survey, {name, value}) => {
                    props.setData({data: survey.data});
                    // No idea why, but cerebral freaks out if I call this
                    // without the setTimeout...
                    setTimeout(() => this.updatePages(survey));
                }}
                completedHtml={
                    ReactDOMServer.renderToString(props.completedHtml)
                }
                onAfterRenderQuestion={
                    (survey, {question, htmlElement}) => {
                        if (!question.cerebralbutton) {
                            return;
                        }

                        let seq = get(sequences`${question.cerebralbutton}`);
                        ReactDOM.render(
                            <Button onClick={() => seq()}>
                                {question.title}
                            </Button>
                        , htmlElement);
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
        setPages: sequences`setPages`,
    },
    withTheme()(Questions)
);
