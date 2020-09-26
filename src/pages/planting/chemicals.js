export default {
    name: 'planting-chemicals',
    title: 'Chemicals',
    visibleIf: '{purpose} == "Planting"',
    elements: [
        {
            name: 'planting-chemicals-starter',
            title: 'Starter',
            type: 'text',
            isRequired: true,
            autocomplete: 'previous',
            autofill: 'lastused',
        },
        {
            name: 'planting-chemicals-insectiside',
            title: 'Insecticide',
            type: 'text',
            isRequired: true,
            autocomplete: 'previous',
            autofill: 'lastused',
        },
    ],
};
