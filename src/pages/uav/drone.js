// TODO: Get these from sheets
const drones = [
    {
        make: 'Test',
        model: 'testtest',
        type: 'Fixed wing',
    },
];

export default {
    name: 'uav-drone',
    title: 'Drone Info',
    visibleIf: '{purpose} == "UAV"',
    elements: [
        {
            // TODO: make required for submission only
            name: 'drone-screenshots',
            title: 'Flight Planning Screenshots',
            type: 'panel',
            elements: [
                {
                    name: 'drone-flight-planning',
                    title: 'Screenshot of Flight Planning',
                    type: 'file',
                    storeDataAsText: false,
                    allowMultiple: false,
                },
                {
                    name: 'drone-advanced-flight-planning',
                    title: 'Screenshot of Advanced Flight Planning',
                    type: 'file',
                    allowMultiple: false,
                },
            ],
        },
        {
            name: 'drone-qr',
            title: 'Scan drone QR code',
            type: 'html',
            cerebralbutton: 'showDroneQRScanner',
            visible: false,
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
};
