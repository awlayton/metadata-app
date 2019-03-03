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

export async function initGapi({gapiClient, props}) {
	return gapiClient.init(props);
}
export async function createSheet({googlesheets}) {
	let sheet = await googlesheets.createSheet();
	return {sheet};
}
export async function initSheet({googlesheets, props}) {
	let {result} = await googlesheets.createSheet();
	await googlesheets.addRow(result.spreadsheetId, props.headerRow);
}
export async function serializeResults({props}) {
	let {results} = props;

	// TODO: Better way to handle arrays and such in a spreadsheet?
	let serialized = results.map(result => {
		let serialized = {};
		Object.keys(result).forEach(key => {
			if (result[key] && typeof result[key] === 'object') {
				serialized['$$' + key] = JSON.stringify(result[key]);
			} else {
				serialized[key] = result[key];
			}
		});
		return serialized;
	});

	return {results: serialized};
}
export async function deserializeResults({props}) {
	let {results} = props;

	let deserialized = results.map(result => {
		let deserialized = {};
		Object.keys(result).forEach(key => {
			if (key.startsWith('$$')) {
				deserialized[key.substring(2)] = JSON.parse(result[key]);
			} else {
				deserialized[key] = result[key];
			}
		});
		return deserialized;
	});

	return {results: deserialized};
}
export async function loadPastResults({googlesheets, props}) {
	let {resultsId} = props;

	let results = (await googlesheets.getSheet(resultsId)) || [];

	return {results};
}
export async function uploadResults({googlesheets, props}) {
	let {results, resultsId} = props;

	return googlesheets.writeSheet(resultsId, results);
}

export async function createAppData({googleappdata, props}) {
    let result = await googleappdata.initData(props);

    return {result};
}
export async function loadAppData({googleappdata, path}) {
    let data = await googleappdata.getData();

    if (data) {
        return path.found({body: data});
    } else {
        return path.notfound();
    }
}
