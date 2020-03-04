export default {
    name: 'tillage-conditions',
    title: 'Conditions',
    visibleIf: '{purpose} == "Tillage"',
    elements: [
        {
            name: 'tillage-conditions-residue-start',
            title: 'Residue Cover (%) at Start',
            type: 'text',
            inputType: 'number',
            isRequired: false
        },
        {
            name: 'tillage-conditions-residue-after',
            title: 'Residue Cover (%) after Tillage',
            type: 'text',
            inputType: 'number',
            isRequired: false
        },
        {
            name: 'tillage-conditions-soil-temp',
            title: 'Soil Temperature (℉)',
            type: 'text',
            inputType: 'number',
            isRequired: true,
            placeHolder: '50 F'
        },
        {
            name: 'tillage-conditions-soil-moisture',
            title: 'Soil Moisture (%)',
            type: 'text',
            inputType: 'number',
            isRequired: true,
            placeHolder: '23 %'
        },
        {
            name: 'tillage-conditions-field-condition-start',
            title: 'Field Condition at Start',
            type: 'text',
            isRequired: false,
            autocomplete: 'previous'
        },
        {
            name: 'tillage-conditions-field-condition-after',
            title: 'Field Condition after Tillage',
            type: 'text',
            isRequired: false,
            autocomplete: 'previous'
        }
    ]
}
