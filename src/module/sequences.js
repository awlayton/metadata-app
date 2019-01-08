import { set } from 'cerebral/operators';
import { state,props } from 'cerebral/tags';
import { sequence, parallel } from 'cerebral';

export const init = [];

export const showDroneQRScanner = [set(state`droneQRScannerActive`, true)];
export const hideDroneQRScanner = [set(state`droneQRScannerActive`, false)];
export const showSensorQRScanner = [set(state`sensorQRScannerActive`, true)];
export const hideSensorQRScanner = [set(state`sensorQRScannerActive`, false)];

export const setSurveyData = [set(state`surveyData`, props`data`)]; 
