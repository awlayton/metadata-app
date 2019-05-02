export default {
    name: 'planting-machinery',
    title: 'Machinery',
    visibleIf: '{purpose} == "Planting"',
    elements: [
        {
            name: 'operator',
            title: 'Operator',
            type: 'text',
            isRequired: true,
            autocomplete: 'previous',
            autofill: 'lastused',
        },
        {
            name: 'tractor-makemodel',
            title: 'Tractor Make and Model',
            type: 'dropdown',
            hideIfChoicesEmpty: false,
            isRequired: true,
            hasOther: true,
            storeOthersAsComment: false,
            otherText: 'Add new make and model',
            otherErrorText:
                'Please enter the new make and model',
            autocomplete: 'previous',
            autofill: 'lastused',
            choices: [
                // TODO: Have default choices from a secondary sheet?
            ],
        },
        {
            name: 'planter-makemodel',
            title: 'Planter Make and Model',
            type: 'dropdown',
            hideIfChoicesEmpty: false,
            isRequired: true,
            hasOther: true,
            storeOthersAsComment: false,
            otherText: 'Add new make and model',
            otherErrorText:
                'Please enter the new make and model',
            autocomplete: 'previous',
            autofill: 'lastused',
            choices: [
                // TODO: Have default choices from a secondary sheet?
            ],
        },
        {
            name: 'planter-num-rows',
            title: 'Number of Planter Rows',
            type: 'text',
            inputType: 'number',
            autofill: 'lastused',
        },
        {
            name: 'machinery-speed',
            title: 'Speed (mph)',
            type: 'text',
            inputType: 'number',
            placeHolder: '15 mph',
        },
        {
            name: 'planting-depth',
            title: 'Planting Depth (in)',
            type: 'text',
            inputType: 'number',
            placeHolder: '1.5 in',
        },
        {
            name: 'machinery-controller-makemodel',
            title: 'Controller Make and Model',
            type: 'dropdown',
            hideIfChoicesEmpty: false,
            isRequired: false,
            hasOther: true,
            storeOthersAsComment: false,
            otherText: 'Add new make and model',
            otherErrorText:
                'Please enter the new make and model',
            autocomplete: 'previous',
            autofill: 'lastused',
            choices: [
                // TODO: Have default choices from a secondary sheet?
            ],
        },
    ],
};
