import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import {connect} from '@cerebral/react';
import {state,signal} from 'cerebral/tags';

import Button from '@material-ui/core/Button';

import * as Survey from 'survey-react';
import 'survey-react/survey.css';

Survey.JsonObject.metaData.addProperty('question', {
    name: 'cerebralbutton',
});

export default connect(Questions);

function Questions({get, completedHtml, ...props}) {
    return (
        <Survey.Survey
            {...props}
            completedHtml={
                ReactDOMServer.renderToString(completedHtml)
            }
            onAfterRenderQuestion={
                (survey, {question, htmlElement}) => {
                    if (!question.cerebralbutton) {
                        return;
                    }

                    ReactDOM.render(
                        <Button
                            onClick={get(signal`${question.cerebralbutton}`)}>
                            {question.title}
                        </Button>
                    , htmlElement);
                }
            }
        />
    );
}
