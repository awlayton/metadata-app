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

export default {
    name: 'uav-sensors',
    title: 'Sensors',
    visibleIf: '{purpose} == "UAV"',
    elements: [
        {
            name: 'sensor-qr',
            type: 'html',
            cerebralbutton: 'showSensorQRScanner',
            visible: false,
        },
        {
            name: 'sensors',
            title: 'Sensors',
            type: 'paneldynamic',
            panelCount: 0,
            panelAddText: 'Add Sensor',
            panelRemoveText: 'Remove Sensor',
            autofill: 'lastused',
            templateTitle: 'Sensor #{panelIndex}',
            templateElements: [
                {
                    name: 'uav-sensor-type',
                    valueName: 'type',
                    title: 'Type',
                    type: 'text',
                    autocomplete: 'previous',
                    isRequired: true,
                    hasOther: true,
                    storeOthersAsComment: false,
                    choices: [
                        'RGB',
                        'Multispectral',
                        'Hyperspectral',
                        'LiDAR',
                        'Thermal',
                    ],
                },
                {
                    name: 'uav-sensor-makemodel',
                    title: 'Make and Model',
                    type: 'dropdown',
                    hideIfChoicesEmpty: false,
                    isRequired: true,
                    hasOther: true,
                    storeOthersAsComment: false,
                    otherText: 'Add new make and model',
                    otherErrorText: 'Please enter the new make and model',
                    choices: sensors.map((e, i) => ({
                        text: e.make + ' ' + e.model,
                        value: e.make + ' ' + e.model,
                        //value: i,
                        visibleIf: `{panel.type} == "${e.type}"`,
                    })),
                },
            ],
        },
    ],
};
