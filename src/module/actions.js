//import {state} from 'cerebral';

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
