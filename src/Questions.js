import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import Button from '@material-ui/core/Button';

import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import surveyModel from './surveyModel';

Survey.JsonObject.metaData.addProperty('question', {
    name: 'cerebralbutton',
});

function Questions({get, ...props}) {
    return (
        <Survey.Survey
            {...props}
            completedHtml={
                ReactDOMServer.renderToString(props.completedHtml)
            }
            onAfterRenderQuestion={
                (survey, {question, htmlElement}) => {
                    if (!question.cerebralbutton) {
                        return;
                    }

                    ReactDOM.render(
                        <Button
                            onClick={get(sequences`${question.cerebralbutton}`)}>
                            {question.title}
                        </Button>
                    , htmlElement);
                }
            }
        />
    );
}

export default connect(
    {
        questions: state`questions`,
        init: sequences`initSurvey`,
		setData: sequences`setSurveyData`,
		setPage: sequences`setSurveyPage`,
    },
    ({questions, ...props}, ownProps, get) => {
        let model = new Survey.Model(questions);
        surveyModel.model = model;

		// TODO: I'm sure this is isn't right with cerebral..
        let data = get(state`surveyData`);
        if (data) {
            model.data = data;
        }
		let pageNum = get(state`pageNum`);
		if (pageNum !== undefined) {
			model.currentPageNo = pageNum; 
		}

        return {
            ...ownProps,
            ...props,
            get,
            model,
        };
    },
    Questions
);
