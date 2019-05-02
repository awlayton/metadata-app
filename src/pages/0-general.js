import {DateTime} from 'luxon';

export default {
    name: 'general',
    title: 'General',
    elements: [
        {
            name: 'jobname',
            title: 'Job/Project name',
            type: 'text',
            autocomplete: 'previous',
            choices: [
                'Bob Ross',
                'Rusty Shackleford',
            ],
        },
        {
            name: 'purpose',
            title: 'Operation/Purpose',
            type: 'dropdown',
            choices: [
                'UAV',
                'Planting',
                {
                    value: 'Spraying',
                    text: 'Spraying/Spreading',
                },
                'Tillage',
                'Harvest'
            ],
            isRequired: true,
            autofill: 'lastused',
        },
        {
            name: 'datetime',
            title: 'Date/Time of data',
            type: 'text',
            inputType: 'datetime-local',
            defaultValue: DateTime.local().toFormat("yyyy-MM-dd'T'HH:mm:ss"),
        },
        {
            type: 'panel',
            elements: [
                {
                    // TODO: Support selecting region on a map
                    name: 'locations',
                    title: 'Collection locations',
                    type: 'paneldynamic',
                    panelCount: 1,
                    minPanelCount: 1,
                    panelAddText: 'Add Location',
                    panelRemoveText: 'Remove Location',
                    templateTitle: 'Location #{panelIndex}',
                    templateElements: [
                        {
                            name: 'location',
                            title: 'Lat/Lon or Label',
                            type: 'text',
                            autofill: 'location',
                            isRequired: true,
                        },
                    ],
                },
                /*
                {
                    name: 'location-button',
                    title: 'Add current location',
                    type: 'html',
                    cerebralbutton: 'setCurrentLocation',
                },
                */
            ],
        },
    ]
};
