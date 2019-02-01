import {set, merge} from 'cerebral/operators';
import {state, props} from 'cerebral/tags';
import * as actions from './actions';
import {sequence, parallel} from 'cerebral';

export const init = [];

export const showDroneQRScanner = [set(state`droneQRScannerActive`, true)];
export const hideDroneQRScanner = [set(state`droneQRScannerActive`, false)];
export const showSensorQRScanner = [set(state`sensorQRScannerActive`, true)];
export const hideSensorQRScanner = [set(state`sensorQRScannerActive`, false)];
export const showNavigation = [set(state`navigationOpen`, true)];
export const hideNavigation = [set(state`navigationOpen`, false)];

export const setSurveyData = [set(state`surveyData`, props`data`)];
export const setAnswer = [actions.setAnswer];
export const setCurrentLocation = [
    actions.getCurrentLocation,
    set(props`question`, 'latitude'),
    set(props`answer`, props`currentLoc.latitude`),
    actions.setAnswer,
    set(props`question`, 'longitude'),
    set(props`answer`, props`currentLoc.longitude`),
    actions.setAnswer,
];
