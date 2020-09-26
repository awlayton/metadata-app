export default {
    name: 'uav-operator',
    title: 'UAV Operator',
    visibleIf: '{purpose} == "UAV"',
    elements: [
        {
            name: 'remote-pics',
            title: 'Remote Pilot in Command (PIC)',
            description:
                'remote PIC - A person who holds a remote pilot certificate with an sUAS rating and has the final authority and responsibility for the operation and safety of an sUAS operation conducted under part 107.',
            type: 'paneldynamic',
            panelCount: 1,
            minPanelCount: 1,
            panelAddText: 'Add Remote PIC',
            panelRemoveText: 'Remove Remote PIC',
            autofill: 'lastused',
            templateTitle: 'Remote PIC #{panelIndex}',
            templateElements: [
                {
                    name: 'remote-pic-name',
                    title: 'Name',
                    type: 'text',
                    autocomplete: 'previous',
                    //autofill: 'person',
                    isRequired: true,
                    placeHolder: 'Rusty Shackleford',
                },
                {
                    name: 'remote-pic-certificate',
                    title: 'Certificate Number or equivalent',
                    type: 'text',
                    inputType: 'number',
                    isRequired: true,
                    placeHolder: '1234567',
                    validators: [
                        {
                            type: 'regex',
                            regex: /^[0-9]{7}$/,
                            text: 'License number must be 7 digits',
                        },
                    ],
                },
            ],
        },
        {
            name: 'observer',
            title: 'Visual Observer (VO)',
            description:
                'VO - A person acting as a flightcrew member who assists the small UA remote PIC and the person manipulating the controls to see and avoid other air traffic or objects aloft or on the ground.',
            type: 'paneldynamic',
            panelCount: 0,
            panelAddText: 'Add VO',
            panelRemoveText: 'Remove VO',
            templateTitle: 'VO #{panelIndex}',
            templateElements: [
                {
                    name: 'observer-name',
                    title: 'Name',
                    type: 'text',
                    isRequired: true,
                    placeHolder: 'John Doe',
                },
            ],
        },
    ],
};
