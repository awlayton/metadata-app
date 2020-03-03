import {set, unset, push, concat, when, equals} from 'cerebral/factories';
import {state, sequences, props} from 'cerebral/tags';
import * as actions from './actions';

export const init = [
    set(props`login`, sequences`login`),
    set(props`logout`, sequences`logout`),
    actions.initGapi,
    ({get}) => get(sequences`store.init`)(),
    set(state`initialized`, true),
];

export const showDroneQRScanner = [set(state`droneQRScannerActive`, true)];
export const hideDroneQRScanner = [set(state`droneQRScannerActive`, false)];
export const showSensorQRScanner = [set(state`sensorQRScannerActive`, true)];
export const hideSensorQRScanner = [set(state`sensorQRScannerActive`, false)];
export const showNavigation = [set(state`navigationOpen`, true)];
export const hideNavigation = [set(state`navigationOpen`, false)];

export const setSurveyData = [set(state`surveyData`, props`data`)];
export const setAnswer = [actions.setAnswer];
export const setSurveyPage = [
    set(state`pageNum`, props`pageNum`),
];
export const setPages = [set(state`pages`, props`pages`)];
export const goNextPage = [
    actions.nextPage,
    /*
    set(props`pageNum`, state`pageNum`, num => num + 1),
    set(state`pageNum`, props`pageNum`),
    */
];
export const goPreviousPage = [
    actions.previousPage,
    /*
    set(props`pageNum`, state`pageNum`, num => num - 1),
    set(state`pageNum`, props`pageNum`),
    */
];
export const completeSurvey = [actions.completeSurvey];
export const setCurrentLocation = [
    actions.getCurrentLocation,
    set(props`locations`, state`surveyData.locations`),
    // Using the push factory seems to break things...
    ({props}) => ({locations: props.locations.concat(props.currentLoc)}),
    set(props`question`, 'locations'),
    set(props`answer`, props`locations`),
    actions.setAnswer,
];

// Create a sheet and put corresponding appdata in props...
const createSheetWithAppData = [
    actions.createSheet,
    set(props`body`, {}),
    set(props`body.resultsId`, props`sheet.spreadsheetId`),
    // Only load results for the right version
    // TODO: Support migrating sheets to higher versions?
    ({props}) => ({
        body: {[`resultsId-v${props.version}`]: props.body.resultsId}
    }),
];

export const loadappdata = [
    actions.getSheetVersion,
    actions.loadAppData,
    {
        found: [],
        notfound: [
            createSheetWithAppData,
            actions.createAppData,
        ],
    },
    ({props}) => ({
        body: {resultsId: props.body[`resultsId-v${props.version}`]}
    }),
    set(state`resultsId`, props`body.resultsId`, id => id || ''),
    set(state`appdataId`, props`id`),
];

export const uploadScreenshot = [
    actions.uploadScreenshot,
];

// Run _after_ login
export const login = [
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
            set(state`loggedin`, props`name`, name => ({name})),
        ],
    },
];
// Runs _after_ logout
export const logout = [
    set(state`loggedin`, false),
    set(state`pastData`, []),
];

export const disconnectGoogle = [actions.disconnectGapi];

export const createSheet = [actions.createSheet];
export const submitResults = [
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
    ({get}) => get(sequences`store.clear`)(),
];

export const confirmSubmit = [
    set(state`confirmSubmitOpen`, false),
    () => window.location.reload(),
];

export const setDebugMenuOpen = [set(state`debugMenuOpen`, props`open`)];

export const getCurrentLocationWeather = [
    actions.getCurrentLocation,
    set(props`latitude`, props`currentLoc.latitude`),
    set(props`longitude`, props`currentLoc.longitude`),
    actions.getCurrentWeather,
];

export const autofill = [
    when(
        props`question`,
        state`surveyData`,
        (q, d) => d[q] !== null && d[q] !== undefined,
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
                    set(props`answer`, props`currentLoc`,
                        ({latitude, longitude}) =>
                            `${latitude},${longitude}`),
                ],
                // TODO: Combine weather autofills?
                temperature: [
                    getCurrentLocationWeather,
                    set(props`answer`, props`temperature`),
                ],
                windspeed: [
                    getCurrentLocationWeather,
                    set(props`answer`, props`wind_speed`),
                ],
                winddirection: [
                    getCurrentLocationWeather,
                    set(props`answer`, props`wind_dir`),
                ],
                lastused: [
                    actions.getLastAnswer,
                ],
                otherwise: [],
            },
        ],
    },
];

export const displayError = [
    ({error}) => console.error(error),
    set(state`error`, props`error`),
];
export const clearError =[unset(state`error`)];
