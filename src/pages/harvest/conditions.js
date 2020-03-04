export default {
    name: 'harvest-conditions',
    title: 'Crop Conditions',
    visibleIf: '{purpose} == "Harvest"',
    elements: [
        {
            name: 'harvest-conditions-moisture',
            title: 'Grain Average Moisture (%)',
            type: 'text',
            inputType: 'number',
            isRequired: false,
            placeHolder: '5 %'
        },
        {
            name: 'harvest-conditions-anticipated-yield-avg',
            title: 'Anticipated Yield Average (bu/ac)',
            type: 'text',
            inputType: 'number',
            isRequired: false,
            placeHolder: '250 bu/ac'
        },
        {
            name: 'harvest-conditions-lodging',
            title: 'Lodging',
            type: 'dropdown',
            isRequired: true,
            choices: ['None', 'Slight', 'Moderate', 'Severe']
        },
        {
            name: 'harvest-conditions-grain-quality',
            title: 'Grain Quality',
            type: 'tagbox',
            placeHolder: 'Add conditions',
            isRequired: false,
            choices: [
                'Moldy',
                'Splits',
                'Grain Damage',
                'High Foreign Matter',
                'Sprouting Seeds'
            ],
            previousAsChoices: true
        }
    ]
}
