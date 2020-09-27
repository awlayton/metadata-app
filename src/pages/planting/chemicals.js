export const page = {
    name: 'planting-chemicals',
    title: 'Chemicals',
    visibleIf: '{purpose} == "Planting"',
    elements: [
        {
            name: 'planting-chemicals-starter',
            title: 'Starter/Fertilizer',
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

export default page;
