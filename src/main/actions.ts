import forIn from 'lodash.forin';

import { state } from 'cerebral';

import { Context, State } from './types';
import { SurveyModel } from 'survey-react';

export async function getCurrentLocation({ geolocation }: Context) {
    return geolocation.getCurrentLoc().then(({ latitude, longitude }) => ({
        currentLoc: { latitude, longitude },
    }));
}

export function setAnswer({
    survey,
    props,
}: Context<{ question: string; answer: any }>) {
    return survey.setAnswer(props.question, props.answer);
}
export function setSurveyPage({ survey, props }: Context) {
    return survey.setPage(props.pageNum);
}
export function setSurveyData({
    survey,
    props,
}: Context<{ data: SurveyModel['data'] }>) {
    return survey.setData(props.data);
}
export function nextPage({ survey }: Context) {
    return { error: survey.nextPage() };
}
export function previousPage({ survey }: Context) {
    return { error: survey.previousPage() };
}
export function completeSurvey({ survey }: Context) {
    return { done: survey.submit() };
}

export async function initGapi({
    gapiClient,
    props,
}: Context<{ login: () => void; logout: () => void }>) {
    return gapiClient.init(props);
}
export async function disconnectGapi({ gapiClient }: Context) {
    return gapiClient.disconnect();
}
export async function createSheet({ googlesheets }: Context) {
    let sheet = await googlesheets.createSheet();
    return { sheet };
}
export function getSheetVersion({ googlesheets }: Context) {
    let version = googlesheets.getVersion();
    return { version };
}
export async function initSheet({
    googlesheets,
    props,
}: Context<{ headerRow: any }>) {
    const { spreadsheetId } = await googlesheets.createSheet();
    if (!spreadsheetId) {
        throw Error('Error initializng Google Sheet');
    }
    await googlesheets.addRow(spreadsheetId, props.headerRow);
}
export async function serializeResults({
    serialize,
    props,
}: Context<{ results: Record<string, unknown>[] }>) {
    let { results } = props;

    return { results: serialize.serialize(results) };
}
export async function deserializeResults({
    serialize,
    props,
}: Context<{ results: Record<string, any>[] }>) {
    let { results } = props;

    return { results: serialize.deserialize(results) };
}
export async function loadPastResults({
    googlesheets,
    path,
    props,
}: Context<{ resultsId: string }>) {
    let { resultsId } = props;

    try {
        let results = (await googlesheets.getSheet(resultsId)) || [];

        return path.found({ results });
    } catch (err) {
        return path.notfound();
    }
}
export async function uploadResults({
    googlesheets,
    props,
}: Context<{ results: any; resultsId: string }>) {
    let { results, resultsId } = props;

    return googlesheets.writeSheet(resultsId, results);
}

export async function createAppData({
    googleappdata,
    props,
}: Context<{ body: object }>) {
    let id = await googleappdata.initData(props);

    return { id };
}
export async function updateAppData({
    googleappdata,
    props,
}: Context<{ id: string; body: object }>) {
    let result = await googleappdata.updateData(props);

    return { result };
}
export async function loadAppData({ googleappdata, path }: Context) {
    let { data, id } = await googleappdata.getData();

    if (data) {
        return path.found({ body: data, id });
    } else {
        return path.notfound();
    }
}

export async function uploadScreenshot({
    googledrive,
    props,
}: Context<{ file: File }>) {
    let url = await googledrive.upload(props.file);

    return { url };
}

export async function getCurrentWeather({
    weather,
    props: { latitude, longitude },
}: Context<{ latitude: string; longitude: string }>) {
    return await weather.current({ lat: latitude, lon: longitude });
}

export function getLastAnswer({ get, props }: Context<{ question: string }>) {
    let { question } = props;

    try {
        let data = get(state`pastData`);

        return { answer: data[data.length - 1][question] };
    } catch (err) {
        return {};
    }
}

export function initPages({ get, store }: Context) {
    let pages = get(state`questions.pages`) as State['questions']['pages'];

    pages.forEach((page) => {
        forIn(page, function findKeys(val, key, obj, root = '') {
            switch (key) {
                case 'autocomplete':
                    const { name } = obj;
                    // @ts-ignore
                    obj.choices ??= [];
                    switch (val) {
                        case 'previous':
                            // @ts-ignore
                            obj.choices = obj.choices.concat(
                                get(state`pastAnswers.${name}`)
                            );
                            break;
                        case 'previousLocationLabels':
                            const locations: any[] = get(
                                state`pastAnswers.locations`
                            );
                            // @ts-ignore
                            obj.choices = locations
                                .map(
                                    (obj: { location: string }) => obj.location
                                )
                                .filter((location) => !/^\d/.test(location));
                            break;
                        default:
                    }
                    break;
                case 'previousAsChoices':
                    if (val) {
                        let { vauleName: name = obj.name, choices = [] } = obj;
                        let previous: string[] =
                            get(state`pastAnswers.${root}${name}`) || [];
                        previous.forEach((ans) => {
                            if (!choices.includes(ans)) {
                                choices.push(ans);
                            }
                        });
                        // @ts-ignore
                        obj.choices = choices;
                    }
                    break;
                default:
                    if (typeof val === 'object') {
                        forIn(val, (v, k, o) =>
                            findKeys(v, k, o, `${root}${key}.`)
                        );
                    }
            }
        });
    });

    store.merge(state`questions`, { pages });
}
