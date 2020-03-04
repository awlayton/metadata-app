export default {
    name: 'machinery',
    title: 'Machinery',
    visibleIf:
        '["Planting", "Spraying", "Tillage", "Harvest"] contains {purpose}',
    elements: [
        {
            name: 'machinery-operator',
            title: 'Operator',
            type: 'text',
            isRequired: true,
            autocomplete: 'previous',
            autofill: 'lastused'
        },
        {
            name: 'machinery-spray-or-spread',
            visibleIf: '{purpose} == "Spraying"',
            title: 'Spray or Spread',
            type: 'radiogroup',
            choices: ['Spraying', 'Spreading'],
            isRequired: true
        },
        {
            name: 'machinery-pull-type',
            visibleIf: '{purpose} == "Spraying"',
            title: 'Pull Type',
            type: 'radiogroup',
            choices: ['Pull', 'Self-Propelled'],
            isRequired: true
        },
        {
            name: 'machinery-makemodel',
            // TODO: change title based on operation?
            title: 'Machine Make and Model',
            type: 'dropdown',
            hideIfChoicesEmpty: false,
            isRequired: true,
            hasOther: true,
            storeOthersAsComment: false,
            otherText: 'Add new make and model',
            otherErrorText: 'Please enter the new make and model',
            autocomplete: 'previous',
            autofill: 'lastused',
            choices: [
                // TODO: Have default choices from a secondary sheet?
            ]
        },
        {
            name: 'planter-makemodel',
            visibleIf: '{purpose} == "Planting"',
            title: 'Planter Make and Model',
            type: 'dropdown',
            hideIfChoicesEmpty: false,
            isRequired: true,
            hasOther: true,
            storeOthersAsComment: false,
            otherText: 'Add new make and model',
            otherErrorText: 'Please enter the new make and model',
            autocomplete: 'previous',
            autofill: 'lastused',
            choices: [
                // TODO: Have default choices from a secondary sheet?
            ]
        },
        {
            name: 'planter-num-rows',
            visibleIf: '{purpose} == "Planting"',
            title: 'Number of Planter Rows',
            type: 'text',
            isRequired: true,
            inputType: 'number',
            autofill: 'lastused'
        },
        {
            name: 'machinery-implement',
            title: 'Implement',
            type: 'panel',
            elements: [
                {
                    name: 'machinery-implement-type',
                    visibleIf: '{purpose} == "Tillage"',
                    title: 'Type',
                    type: 'dropdown',
                    isRequired: true,
                    hasOther: true,
                    storeOthersAsComment: false,
                    otherText: 'Add new type',
                    otherErrorText: 'Please enter the new type',
                    autofill: 'lastused',
                    autocomplete: 'previous'
                },
                {
                    name: 'machinery-implement-makemodel',
                    visibleIf:
                        '{purpose} == "Tillage" or {machinery-pull-type} == "Self-Propelled"',
                    title: 'Make and Model',
                    type: 'dropdown',
                    hideIfChoicesEmpty: false,
                    isRequired: true,
                    hasOther: true,
                    storeOthersAsComment: false,
                    otherText: 'Add new make and model',
                    otherErrorText: 'Please enter the new make and model',
                    autofill: 'lastused',
                    autocomplete: 'previous'
                }
            ]
        },
        {
            name: 'machinery-calibration-report',
            visibleIf: '{purpose} == "Planting"',
            title: 'Calibration Report',
            type: 'text',
            isRequired: true
        },
        {
            name: 'machinery-row-width',
            visibleIf: '{purpose} == "Planting"',
            title: 'Row Width (ft)',
            type: 'text',
            inputType: 'number',
            placeHolder: '3 ft',
            isRequired: true,
            autofill: 'lastused'
        },
        {
            name: 'machinery-width',
            visibleIf: '["Spraying", "Tillage"] contains {purpose}',
            title: 'Width (ft)',
            type: 'text',
            inputType: 'number',
            placeHolder: '30 ft',
            isRequired: true,
            autofill: 'lastused'
        },
        {
            name: 'machinery-hearder-width',
            visibleIf: '{purpose} == "Harvest"',
            title: 'Header Width (ft or rows)',
            type: 'text',
            inputType: 'number',
            placeHolder: '30 ft',
            isRequired: true,
            autofill: 'lastused'
        },
        {
            name: 'machinery-sprayer-type',
            visibleIf: '{purpose} == "Spraying"',
            title: 'Type',
            type: 'dropdown',
            isRequired: true,
            autofill: 'lastused',
            choices: ['Nozzles', 'Drop Tube', 'Spinner']
        },
        {
            name: 'machinery-rate',
            visibleIf: '{purpose} == "Spraying"',
            title: 'Rate',
            type: 'text',
            isRequired: true
        },
        {
            name: 'machinery-speed',
            title: 'Speed (mph)',
            type: 'text',
            isRequired: true,
            inputType: 'number',
            placeHolder: '15 mph'
        },
        {
            name: 'machinery-depth',
            visibleIf: '["Planting", "Tillage"] contains {purpose}',
            title: 'Depth (in)',
            type: 'text',
            isRequired: true,
            inputType: 'number',
            placeHolder: '1.5 in'
        },
        {
            name: 'machinery-yield-mapped',
            visibleIf: '{purpose} == "Harvest"',
            title: 'Yield Mapped?',
            type: 'boolean',
            isRequired: true
        },
        {
            name: 'machinery-yield-calibrated',
            visibleIf: '{purpose} == "Harvest"',
            title: 'Yield Monitor Calibrated?',
            type: 'boolean',
            isRequired: true
        },
        {
            name: 'machinery-controller-makemodel',
            visibleIf: '["Planting", "Spraying"] contains {purpose}',
            title: 'Controller Make and Model',
            type: 'dropdown',
            hideIfChoicesEmpty: false,
            isRequired: false,
            hasOther: true,
            storeOthersAsComment: false,
            otherText: 'Add new make and model',
            otherErrorText: 'Please enter the new make and model',
            autocomplete: 'previous',
            autofill: 'lastused',
            choices: [
                // TODO: Have default choices from a secondary sheet?
            ]
        },
        {
            name: 'machinery-variable-rate',
            visibleIf: '{purpose} == "Spraying"',
            title: 'Variable Rate?',
            type: 'boolean',
            isRequired: true
        },
        {
            name: 'machinery-variable-rate-source',
            visibleIf:
                '{purpose} == "Spraying" and {machinery-variable-rate} == true',
            title: 'Variable Rate Source',
            type: 'text',
            isRequired: true,
            autocomplete: 'previous'
        }
    ]
}
