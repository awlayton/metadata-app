import {set, unset, push, pop, shift, unshift, merge} from 'cerebral/factories';
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
	/*
	set(props`question`, 'locations'),
	unshift(state`surveyData.locations`, {}),
	set(props`answer`, state`surveyData.locations`),
    actions.setAnswer,
	shift(state`surveyData.locations`),
	*/
	push(state`surveyData.locations`, props`currentLoc`),
	/*
	set(props`answer`, state`surveyData.locations`),
    actions.setAnswer,
	*/
];

export const login = [set(state`google`, props`google`)];
export const logout = [unset(state`google`)];

export const createSheet = [actions.createSheet];
