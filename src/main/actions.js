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
export async function disconnectGapi({gapiClient}) {
    return gapiClient.disconnect();
}
export async function createSheet({googlesheets}) {
    let sheet = await googlesheets.createSheet();
    return {sheet};
}
export async function initSheet({googlesheets, props}) {
    let {result} = await googlesheets.createSheet();
    await googlesheets.addRow(result.spreadsheetId, props.headerRow);
}
export async function serializeResults({serialize, props}) {
    let {results} = props;

    return {results: serialize.serialize(results)};
}
export async function deserializeResults({serialize, props}) {
    let {results} = props;

    return {results: serialize.deserialize(results)};
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

export async function uploadScreenshot({googledrive, props}) {
    let url = await googledrive.upload(props.file);

    return {url};
}

export async function getCurrentWeather({weather, props}) {
    let query = props.latitude + ',' + props.longitude;
    return await weather.current(query);
}
