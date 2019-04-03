export default {
    name: 'b4ufly',
    title: 'B4UFLY Status',
    visible: false, // Get rid of B4UFLY page for now
    elements: [
        {
            name: 'b4ufly-status',
            title: 'Status',
            type: 'dropdown',
            isRequired: true,
            choices: [
                'proceed with caution',
                'flying in controlled airspace (class B/C/D/E)',
                'other',
            ],
        },
        {
            name: 'b4ufly-extra',
            title: '',
            type: 'panel',
            visibleIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)" or {b4ufly-status} == "other"',
            elements: [
                {
                    name: 'b4ufly-airport-operator',
                    title: 'Airport Operator Contact',
                    type: 'text',
                    requiredIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"',
                },
                {
                    name: 'b4ufly-control-tower',
                    title: 'Control Tower Contact',
                    type: 'text',
                    requiredIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"',
                },
                {
                    name: 'b4ufly-prior-authorization',
                    title: 'Prior Authorization',
                    type: 'text',
                    requiredIf: '{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"',
                },
            ],
        },
        {
            // TODO: What the heck even is this?
            name: 'b4ufly-options',
            title: 'Options',
            type: 'checkbox',
            isRequired: true,
            choices: [
                'checked NOTAMS',
                'checked flight restrictions',
                'checked local restrictions',
                'checked upcoming restrictions',
                'checked national parks',
            ],
        },
        {
            name: 'b4ufly-certificate',
            title: 'COW or COA #',
            type: 'text',
        },
    ],
};
