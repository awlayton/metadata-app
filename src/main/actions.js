import forIn from 'lodash.forin';

import {state} from 'cerebral/tags';

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
export function getSheetVersion({googlesheets}){
    let version = googlesheets.getVersion();
    return {version};
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
export async function loadPastResults({googlesheets, path, props}) {
    let {resultsId} = props;

    try {
        let results = (await googlesheets.getSheet(resultsId)) || [];

        return path.found({results});
    } catch (err) {
        return path.notfound();
    }
}
export async function uploadResults({googlesheets, props}) {
    let {results, resultsId} = props;

    return googlesheets.writeSheet(resultsId, results);
}

export async function createAppData({googleappdata, props}) {
    let id = await googleappdata.initData(props);

    return {id};
}
export async function updateAppData({googleappdata, props}) {
    let result = await googleappdata.updateData(props);

    return {result};
}
export async function loadAppData({googleappdata, path}) {
    let {data, id} = await googleappdata.getData();

    if (data) {
        return path.found({body: data, id});
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

export function getLastAnswer({get, props}) {
    let {question} = props;

    try {
        let data = get(state`pastData`);

        return {answer: data[data.length - 1][question]};
    } catch (err) {
        return {};
    }
}

export function initPages({get, store}) {
    let pages = get(state`questions.pages`);

    pages.forEach(page => {
        forIn(page, function findKeys(val, key, obj) {
            switch (key) {
                case 'autocomplete':
                    switch (val) {
                        case 'previous':
                            let {name} = obj;
                            obj.choices = get(state`pastAnswers.${name}`);
                            break;
                        default:
                    }
                    break;
                case 'previousAsChoices':
                    if (val) {
                        let {name, choices=[]} = obj;
                        let previous = get(state`pastAnswers.${name}`) || [];
                        previous.forEach(ans => {
                            if (!choices.includes(ans)) {
                                choices.push(ans);
                            }
                        });
                        obj.choices = choices;
                    }
                    break;
                default:
                    if (typeof val === 'object') {
                        forIn(val, findKeys);
                    }
            }
        });
    });

    store.merge(state`questions`, {pages});
}
