export default {
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
            isRequired: true
        },
        {
            name: 'seed-variety',
            title: 'Variety',
            type: 'text',
            autofill: 'lastused',
            autocomplete: 'previous',
            isRequired: true
        },
        {
            name: 'seed-treatments',
            title: 'Treatments',
            type: 'tagbox',
            isRequired: true,
            placeHolder: 'Choose Treatments',
            previousAsChoices: true
        },
        {
            name: 'seed-population',
            title: 'Population',
            type: 'text',
            inputType: 'number',
            autofill: 'lastused',
            isRequired: true
        }
    ]
}
