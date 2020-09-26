export default {
    name: 'sensors',
    visibleIf: '{purpose} == "Sensor Deployment"',
    title: 'Sensors',
    elements: [
        {
            // TODO: Support selecting region on a map
            name: 'sensors-deployed',
            title: 'Deployed Sensors',
            type: 'paneldynamic',
            panelCount: 1,
            minPanelCount: 1,
            panelAddText: 'Add Sensor',
            panelRemoveText: 'Remove Sensor',
            templateTitle: 'Sensor #{panelIndex}',
            templateElements: [
                {
                    name: 'sensor-name',
                    valueName: 'name',
                    title: 'Name of Node/Module',
                    type: 'text',
                },
                {
                    name: 'sensor-type',
                    valueName: 'type',
                    // TODO: change title based on operation?
                    title: 'Sensor Type',
                    type: 'dropdown',
                    hideIfChoicesEmpty: false,
                    hasOther: true,
                    storeOthersAsComment: false,
                    otherText: 'Add new sensor type',
                    otherErrorText: 'Please enter the new sensor type',
                    //autocomplete: 'previous',
                    //autofill: 'lastused',
                    previousAsChoices: true,
                    choices: [
                        // TODO: Have default choices from a secondary sheet?
                        'Air Temperature',
                        'Air Relative Humidity',
                        'Nitrate',
                        'Meter Probe',
                    ],
                },
                {
                    name: 'sensor-location',
                    valueName: 'location',
                    title: 'Sensor Location',
                    type: 'text',
                    autofill: 'location',
                },
                {
                    name: 'sensor-note',
                    valueName: 'note',
                    title: 'Sensor note or comment',
                    type: 'comment',
                },
                {
                    name: 'sensor-map',
                    valueName: 'map',
                    title: 'Screenshot of sensor location map',
                    type: 'file',
                    storeDataAsText: false,
                    acceptedTypes: 'image/*',
                    allowMultiple: false,
                },
                {
                    name: 'sensor-installation',
                    valueName: 'installation',
                    title: 'Photo of sensor installation',
                    type: 'file',
                    storeDataAsText: false,
                    acceptedTypes: 'image/*',
                    allowMultiple: false,
                },
            ],
        },
    ],
};
