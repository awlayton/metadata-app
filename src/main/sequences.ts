import { sequence, set, unset, push, when, equals } from 'cerebral/factories';
import { state, sequences, props } from 'cerebral';
import * as actions from './actions';

import { State, Context } from './types';

// The types that come with cerebral are lame
declare module 'cerebral/factories' {
    function set<T>(
        target: T,
        value: T,
        transform: (value: T) => T
    ): ActionFunction<{}, { [k: string]: T }>;
    function set<T>(
        target: T,
        value: T
    ): ActionFunction<{}, { [k: string]: T }>;

    function when<T>(conditon: T): ActionFunction;

    function push<T>(target: T[], value: T): ActionFunction;

    type ActionFunction<Input = {}, Output = {}> = (
        ctx: Context<State> & Input
    ) =>
        | Partial<Output & State>
        | void
        | Promise<Partial<Output & State> | void>;
    type ISequenceArray<Props, Out> = Array<
        | ActionFunction<Props & { props: Out }, Out>
        | {
              [key: string]:
                  | ISequenceArray<Props, Out>
                  | ActionFunction<Props & { props: Out }, Out>;
          }
    >;
    function sequence<Input extends {} = {}, Output extends {} = {}>(
        items: ISequenceArray<Input, Output> | ActionFunction<Input, Output>
    ): ActionFunction<Input, Output>;
}

export const init = sequence([
    set(props`login`, sequences`login`),
    set(props`logout`, sequences`logout`),
    actions.initGapi,
    ({ get }) => get(sequences`store.init`)(),
    set(state`initialized`, true),
]);

export const showDroneQRScanner = sequence([
    set(state`droneQRScannerActive`, true),
]);
export const hideDroneQRScanner = sequence([
    set(state`droneQRScannerActive`, false),
]);
export const showSensorQRScanner = sequence([
    set(state`sensorQRScannerActive`, true),
]);
export const hideSensorQRScanner = sequence([
    set(state`sensorQRScannerActive`, false),
]);
export const showNavigation = sequence([set(state`navigationOpen`, true)]);
export const hideNavigation = sequence([set(state`navigationOpen`, false)]);

export const setSurveyData = sequence([set(state`surveyData`, props`data`)]);
export const setAnswer = sequence([actions.setAnswer]);
export const setSurveyPage = sequence([set(state`pageNum`, props`pageNum`)]);
export const setPages = sequence(sequence([set(state`pages`, props`pages`)]));
export const goNextPage = sequence([
    actions.nextPage,
    /*
    set(props`pageNum`, state`pageNum`, num => num + 1),
    set(state`pageNum`, props`pageNum`),
    */
]);
export const goPreviousPage = sequence([
    actions.previousPage,
    /*
    set(props`pageNum`, state`pageNum`, num => num - 1),
    set(state`pageNum`, props`pageNum`),
    */
]);
export const completeSurvey = sequence([actions.completeSurvey]);
export const setCurrentLocation = sequence<
    {},
    {
        question: string;
        answer: string;
        currentLoc: unknown;
        locations: unknown[];
    }
>([
    actions.getCurrentLocation,
    set(props`locations`, state`surveyData.locations`),
    // Using the push factory seems to break things...
    ({ props }) => ({ locations: props.locations.concat(props.currentLoc) }),
    set(props`question`, 'locations'),
    set(props`answer`, props`locations`),
    actions.setAnswer,
]);

// Create a sheet and put corresponding appdata in props...
const createSheetWithAppData = sequence<
    {},
    {
        version: any;
        body: Record<string, string>;
        sheet: gapi.client.sheets.Spreadsheet;
    }
>([
    actions.createSheet,
    set(props`body`, {}),
    set(props`body.resultsId`, props`sheet.spreadsheetId`),
    // Only load results for the right version
    // TODO: Support migrating sheets to higher versions?
    ({ props }) => ({
        body: { [`resultsId-v${props.version}`]: props.body.resultsId },
    }),
]);

export const loadappdata = sequence<
    {},
    { id: string; body: Record<string, string>; version: string }
>([
    actions.getSheetVersion,
    actions.loadAppData,
    {
        found: [],
        notfound: [createSheetWithAppData, actions.createAppData],
    },
    ({ props }) => ({
        body: { resultsId: props.body[`resultsId-v${props.version}`] },
    }),
    set(state`resultsId`, props`body.resultsId`, (id) => id || ''),
    set(state`appdataId`, props`id`),
]);

export const uploadScreenshot = sequence([actions.uploadScreenshot]);

// Run _after_ login
export const login = sequence([
    when(state`loggedin`),
    {
        true: [], // Don't login multiple times?
        false: [
            set(state`loggedin`, true),
            loadappdata,
            set(props`resultsId`, state`resultsId`),
            actions.loadPastResults,
            {
                found: [
                    actions.deserializeResults,
                    set(state`pastData`, props`results`),
                ],
                notfound: [
                    createSheetWithAppData,
                    set(state`resultsId`, props`sheet.spreadsheetId`),
                    actions.updateAppData,
                ],
            },
            actions.initPages,
            set(state`loggedin`, props`name`, (name) => ({ name })),
        ],
    },
]);
// Runs _after_ logout
export const logout = sequence([
    set(state`loggedin`, false),
    set(state`pastData`, []),
]);

export const disconnectGoogle = sequence([actions.disconnectGapi]);

export const createSheet = sequence([actions.createSheet]);
export const submitResults = sequence<
    {},
    { results: Record<string, any>[]; resultsId: string }
>([
    set(state`submitting`, true),
    when(state`loggedin`),
    {
        true: [],
        false: login,
    },
    push(state`pastData`, state`surveyData`),
    set(props`results`, state`pastData`),
    actions.serializeResults,
    set(props`resultsId`, state`resultsId`),
    actions.uploadResults,
    set(state`resultsUrl`, props`resultsUrl`),
    set(state`confirmSubmitOpen`, true),
    ({ get }) => get(sequences`store.clear`)(),
]);

export const confirmSubmit = sequence([
    set(state`confirmSubmitOpen`, false),
    () => window.location.reload(),
]);

export const setDebugMenuOpen = sequence([
    set(state`debugMenuOpen`, props`open`),
]);

export const getCurrentLocationWeather = sequence([
    actions.getCurrentLocation,
    set(props`latitude`, props`currentLoc.latitude`),
    set(props`longitude`, props`currentLoc.longitude`),
    actions.getCurrentWeather,
]);

export const autofill = sequence([
    when(
        props`question`,
        state`surveyData`,
        (q, d) => d[q] !== null && d[q] !== undefined
    ),
    {
        true: [], // Don't autofill if already answered
        false: [
            equals(props`autofill`),
            {
                person: [set(props`answer`, state`loggedin.name`)],
                // TODO: Combine lat/lon into one autofill?
                latitude: [
                    actions.getCurrentLocation,
                    set(props`answer`, props`currentLoc.latitude`),
                ],
                longitude: [
                    actions.getCurrentLocation,
                    set(props`answer`, props`currentLoc.longitude`),
                ],
                location: [
                    actions.getCurrentLocation,
                    set(
                        props`answer`,
                        props`currentLoc`,
                        ({ latitude, longitude }) => `${latitude},${longitude}`
                    ),
                ],
                // TODO: Combine weather autofills?
                temperature: [
                    getCurrentLocationWeather,
                    set(props`answer`, props`main.temp`),
                ],
                windspeed: [
                    getCurrentLocationWeather,
                    set(props`answer`, props`wind.speed`),
                ],
                winddirection: [
                    getCurrentLocationWeather,
                    set(props`answer`, props`wind.deg`),
                ],
                lastused: [actions.getLastAnswer],
                otherwise: [],
            },
        ],
    },
]);

export const displayError = sequence<{ error: string }, {}>([
    ({ error }) => console.error(error),
    set(state`error`, props`error`),
]);
export const clearError = sequence([unset(state`error`)]);
