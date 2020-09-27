// TODO: Get these from sheets
const drones = [
    {
        make: 'Test',
        model: 'testtest',
        type: 'Fixed wing',
    },
];

export const page = {
    name: 'uav-drone',
    title: 'UAV Info',
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
                    acceptedTypes: 'image/*',
                    allowMultiple: false,
                },
                {
                    name: 'drone-advanced-flight-planning',
                    title: 'Screenshot of Advanced Flight Planning',
                    type: 'file',
                    storeDataAsText: false,
                    acceptedTypes: 'image/*',
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
            choices: ['Fixed wing', 'Multi-rotor', 'Helicopter'],
        },
        {
            name: 'uav-drone-makemodel',
            title: 'Make and Model',
            type: 'dropdown',
            autofill: 'lastused',
            hideIfChoicesEmpty: false,
            hasOther: true,
            storeOthersAsComment: false,
            otherText: 'Add new make and model',
            otherErrorText: 'Please enter the new make and model',
            choices: drones.map((e, i) => ({
                text: e.make + ' ' + e.model,
                value: e.make + ' ' + e.model,
                //value: i,
                visibleIf: `{uav-drone-type} == "${e.type}"`,
            })),
        },
    ],
};

export default page;
