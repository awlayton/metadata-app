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
            select2Config: {
                tags: true,
                multiple: true,
                theme: 'default',
                placeholder: 'add treatments',
                //allowClear: true,
                tokenSeparators: [','],
                //containerCssClass: 'sv_q_text_root',
            },
            //autofill: 'lastused',
            //autocomplete: 'previous',
            isRequired: true,
            placeHolder: 'Choose Treatments',
            choices: [
                'a',
                'b',
            ],
        },
        {
            name: 'seed-population',
            title: 'Population',
            type: 'text',
            inputType: 'number',
            autofill: 'lastused',
            isRequired: true,
        },
    ],
};
