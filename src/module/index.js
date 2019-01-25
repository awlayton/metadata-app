import { Module } from 'cerebral';
//import { set } from 'cerebral/operators';
//import { state } from 'cerebral/tags';
//
import * as Survey from 'survey-react';

import * as providers from './providers';
import * as signals from './sequences';

// TODO: Get current date/time better
var [date, time] = (new Date((new Date()).toLocaleString() + ' UTC'))
        .toISOString().split(/[TZ]/);

export default Module({
    signals,
    state: {
        droneQRScannerActive: false,
        sensorQRScannerActive: false,
        surveyData: null,
        questions: {
            pages: [
                {
                    name: 'general',
                    title: 'General',
                    elements: [
                        {
                            name: 'purpose',
                            title: 'Purpose',
                            type: 'dropdown',
                            choices: [
                                'UAV',
                                'Planting',
                                'Spraying',
                                'Tilling',
                                'Harvest'
                            ],
                            defaultValue: 'UAV' // TODO: remove default later
                        },
                        {
                            name: 'datetime',
                            title: 'Date/Time of data',
                            type: 'multipletext',
                            defaultValue: {
                                date: date,
                                time: time,
                            },
                            items: [
                                {
                                    name: 'date',
                                    title: 'Date',
                                    inputType: 'date',
                                },
                                {
                                    name: 'time',
                                    title: 'Time',
                                    inputType: 'time',
                                },
                            ]
                        },
                        {
                            // TODO: Support selecting region on a map
                            name: 'location',
                            title: 'Collection location',
                            type: 'panel',
                            state: 'collapsed',
                            elements: [
                                {
                                    name: 'location-button',
                                    title: 'Get current location',
                                    type: 'html',
                                    cerebralbutton: 'setCurrentLocation',
                                },
                                {
                                    name: 'latitude',
                                    title: 'Latitude',
                                    type: 'text',
                                },
                                {
                                    name: 'longitude',
                                    title: 'Longitude',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            name: 'notes',
                            title: 'Notes or comments',
                            type: 'comment'
                        },
                    ]
                },
                {
                    name: 'uav',
                    title: 'UAV Info',
                    visibleIf: '{purpose} == "UAV"',
                    elements: [
                        {
                            name: 'license',
                            title: 'Operator License',
                            type: 'text',
                            isRequired: true,
                            placeHolder: '1234567',
                            validators: [
                                {
                                    type: 'regex',
                                    regex: /^[0-9]{7}$/,
                                    text: 'Invalid license number'
                                }
                            ]
                        },
                        {
                            name: 'operator',
                            title: 'Operator',
                            type: 'text',
                            isRequired: true,
                            placeHolder: 'Rusty Shackleford'
                        },
                        {
                            name: 'observer',
                            title: 'Observer',
                            type: 'text',
                            isRequired: true,
                            placeHolder: 'John Doe'
                        },
                        {
                            name: 'drone-qr',
                            title: 'Scan drone QR code',
                            type: 'html',
                            cerebralbutton: 'showDroneQRScanner',
                        },
                        {
                            name: 'sensor-qr',
                            type: 'html',
                            cerebralbutton: 'showSensorQRScanner',
                        },
                    ]
                },
                {
                    name: 'planting',
                    visibleIf: '!({purpose} == "UAV")',
                    elements: [
                        {
                            name: 'nyi',
                            type: 'html',
                            html: 'Not yet implemented'
                        }
                    ]
                },
            ]
        }
    },
    providers,
});