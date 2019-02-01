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

class Questions extends Component {
	componentWillMount() {
		let get = this.props.get;

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
}

export default connect(
    {
        questions: state`questions`,
        init: sequences`initSurvey`,
		setData: sequences`setSurveyData`,
		setPage: sequences`setSurveyPage`,
    },
    Questions
);
