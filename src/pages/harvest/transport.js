export default {
    name: 'harvest-transport',
    title: 'Transport',
    visibleIf: '{purpose} == "Harvest"',
    elements: [
        {
            name: 'harvest-transport-cart',
            title: 'Grain Cart?',
            type: 'boolean',
            isRequired: true,
        },
        {
            name: 'harvest-transport-cart-makemodel',
            visibleIf: '{harvest-transport-cart} == true',
            title: 'Grain Cart Make and Model',
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
            name: 'harvest-transport-tractor-makemodel',
            visibleIf: '{harvest-transport-cart} == true',
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
    ],
};
