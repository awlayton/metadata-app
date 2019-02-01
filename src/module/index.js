//import { set } from 'cerebral/operators';
//import { state } from 'cerebral/tags';
//
import * as Survey from 'survey-react';

import * as providers from './providers';
import * as sequences from './sequences';

// TODO: Get current date/time better
var [date, time] = (new Date((new Date()).toLocaleString() + ' UTC'))
        .toISOString().split(/[TZ]/);

// TODO: Get these from sheets
const sensors = [
    {
        make: 'Sony',
        model: 'A6000',
        type: 'RGB',
    },
    {
        make: 'Parrot',
        model: 'Sequoia',
        type: 'Multispectral',
    },
];
const drones = [
    {
        make: 'Test',
        model: 'testtest',
        type: 'Fixed wing',
    },
];

export default {
    sequences,
    state: {
        navigationOpen: false,
        droneQRScannerActive: false,
        sensorQRScannerActive: false,
        surveyData: null,
        pageNum: 0,
        questions: {
            showNavigationButtons: false,
			goNextPageAutomatic: true,
            earInvisibleValues: 'onHidden',
            checkErrorsMode: 'onValueChanged',
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
                                    isRequired: true,
                                },
                                {
                                    name: 'longitude',
                                    title: 'Longitude',
                                    type: 'text',
                                    isRequired: true,
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
                    name: 'uav-operator',
                    title: 'UAV Operator',
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
                            placeHolder: 'John Doe'
                        },
                    ]
                },
                {
                    name: 'uav-drone',
                    title: 'Drone Info',
                    visibleIf: '{purpose} == "UAV"',
                    elements: [
                        {
                            name: 'drone-screenshot',
                            title: 'Screenshot of DroneDeploy',
                            type: 'file',
                            allowMultiple: false,
                        },
                        {
                            name: 'drone-qr',
                            title: 'Scan drone QR code',
                            type: 'html',
                            cerebralbutton: 'showDroneQRScanner',
                        },
                        {
                            name: 'uav-drone-type',
                            title: 'Type',
                            type: 'dropdown',
                            isRequired: true,
                            defaultValue: 'Fixed wing',
                            hasOther: true,
                            choices: [
                                'Fixed wing',
                                'Multi-rotor',
                                'Helicopter',
                            ],
                        },
                        {
                            name: 'uav-drone',
                            title: 'Drone',
                            type: 'dropdown',
                            hideIfChoicesEmpty: true,
                            choices: drones.map((e, i) => ({
                                text: e.make + ' ' + e.model,
                                value: e.make + ' ' + e.model,
                                //value: i,
                                visibleIf: `{uav-drone-type} == "${e.type}"`,
                            })),
                        },
                        {
                            name: 'uav-drone-make',
                            title: 'Make',
                            type: 'text',
                            enableIf: '{uav-drone} empty'
                        },
                        {
                            name: 'uav-drone-model',
                            title: 'Model',
                            type: 'text',
                            enableIf: '{uav-drone} empty'
                        },
                    ]
                },
                {
                    name: 'uav-sensors',
                    title: 'Sensors',
                    visibleIf: '{purpose} == "UAV"',
                    elements: [
                        {
                            name: 'sensor-qr',
                            type: 'html',
                            cerebralbutton: 'showSensorQRScanner',
                        },
                        {
                            name: 'sensors',
                            title: 'Sensors',
                            type: 'paneldynamic',
                            panelCount: 1,
                            panelAddText: 'Add Sensor',
                            panelRemoveText: 'Remove Sensor',
                            templateTitle: 'Sensor #{panelIndex}',
                            templateElements: [
                                {
                                    name: 'uav-sensor-type',
                                    valueName: 'type',
                                    title: 'Type',
                                    type: 'dropdown',
                                    isRequired: true,
                                    hasOther: true,
                                    choices: [
                                        'RGB',
                                        'Multispectral',
                                        'Hyperspectral',
                                        'LiDAR',
                                        'Thermal',
                                    ],
                                },
                                {
                                    name: 'uav-sensor',
                                    valueName: 'sensor',
                                    title: 'Sensor',
                                    type: 'dropdown',
                                    hideIfChoicesEmpty: true,
                                    choices: sensors.map((e, i) => ({
                                        text: e.make + ' ' + e.model,
                                        value: e.make + ' ' + e.model,
                                        //value: i,
                                        visibleIf: `{panel.type} == "${e.type}"`,
                                    })),
                                },
                                {
                                    name: 'uav-sensor-make',
                                    valueName: 'sensor.make',
                                    title: 'Make',
                                    type: 'text',
                                    enableIf: '{panel.sensor} empty'
                                },
                                {
                                    name: 'uav-sensor-model',
                                    valueName: 'model',
                                    title: 'Model',
                                    type: 'text',
                                    enableIf: '{panel.sensor} empty'
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'b4ufly',
                    title: 'B4UFLY Status',
                    visibleIf: '{purpose} == "UAV"',
                    elements: [
                        {
                            name: 'b4ufly-status',
                            title: 'Status',
                            type: 'dropdown',
                            isRequired: true,
                            choices: [
                                'proceed with caution',
                                'flying in controlled airspace (class B/C/D/E)',
                                'other',
                            ],
                        },
                        {
                            name: 'b4ufly-extra',
                            title: '',
                            type: 'panel',
                            visibleIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)" or {b4ufly-status} == "other"',
                            elements: [
                                {
                                    name: 'b4ufly-airport-operator',
                                    title: 'Airport Operator Contact',
                                    type: 'text',
                                    requiredIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"',
                                },
                                {
                                    name: 'b4ufly-control-tower',
                                    title: 'Control Tower Contact',
                                    type: 'text',
                                    requiredIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"',
                                },
                                {
                                    name: 'b4ufly-prior-authorization',
                                    title: 'Prior Authorization',
                                    type: 'text',
                                    requiredIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"',
                                },
                            ],
                        },
                        {
                            // TODO: What the heck even is this?
                            name: 'b4ufly-options',
                            title: 'Options',
                            type: 'checkbox',
                            isRequired: true,
                            choices: [
                                'checked NOTAMS',
                                'checked flight restrictions',
                                'checked local restrictions',
                                'checked upcoming restrictions',
                                'checked national parks',
                            ],
                        },
                    ],
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
        },
    },
    providers,
};
