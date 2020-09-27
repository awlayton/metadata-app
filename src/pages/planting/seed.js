export const page = {
    name: 'planting-seed',
    title: 'Seed',
    visibleIf: '{purpose} == "Planting"',
    elements: [
        {
            name: 'seed-brand',
            title: 'Brand',
            type: 'text',
            autofill: 'lastused',
            autocomplete: 'previous',
            isRequired: true,
        },
        {
            name: 'seed-variety',
            title: 'Variety',
            type: 'text',
            autofill: 'lastused',
            autocomplete: 'previous',
            isRequired: true,
        },
        {
            name: 'seed-treatments',
            title: 'Treatments',
            type: 'tagbox',
            isRequired: true,
            placeHolder: 'Choose Treatments',
            previousAsChoices: true,
        },
        {
            type: 'panel',
            elements: [
                {
                    name: 'seed-population',
                    title: 'Population',
                    type: 'text',
                    inputType: 'number',
                    autofill: 'lastused',
                    isRequired: true,
                },
                {
                    name: 'seed-population-units',
                    title: 'Population units',
                    type: 'dropdown',
                    choices: ['seeds per acre', 'pounds per acre'],
                    autofill: 'lastused',
                    isRequired: true,
                },
            ],
        },
    ],
};

export default page;
