//import {state} from 'cerebral';
import {state, props} from 'cerebral/tags';

import XLSX from 'xlsx';

export function getCurrentLocation({geolocation}) {
    return geolocation.getCurrentLoc()
        .then(({latitude, longitude}) => ({currentLoc: {latitude, longitude}}));
}

export function setAnswer({survey, props}) {
    return survey.setAnswer(props.question, props.answer);
}
export function setSurveyPage({survey, props}) {
    return survey.setPage(props.pageNum);
}
export function setSurveyData({survey, props}) {
    return survey.setData(props.data);
}
export function nextPage({survey}) {
    return {error: survey.nextPage()};
}
export function previousPage({survey}) {
    return {error: survey.previousPage()};
}
export function completeSurvey({survey, props}) {
    return {done: survey.submit()};
}

export async function createSheet({googlesheets}) {
	let sheet = await googlesheets.createSheet();
	return {sheet};
}
export async function initSheet({googlesheets, props}) {
	let {result} = await googlesheets.createSheet();
	await googlesheets.addRow(result.spreadsheetId, props.headerRow);
}
export async function uploadResults({googlesheets, get}) {
	let data = get(state`pastData`);
	let results = get(state`surveyData`);

	// TODO: Better way to handle arrays and such in a spreadsheet?
	let newData = {};
	Object.keys(results).forEach(key => {
		if (results[key] && typeof results[key] === 'object') {
			newData[key] = JSON.stringify(results[key]);
		} else {
			newData[key] = results[key];
		}
	});

	return googlesheets.writeSheet(get(state`resultsId`), data.concat(newData));
}
