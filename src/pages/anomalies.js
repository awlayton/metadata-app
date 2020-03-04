const anomalies = [
    'Weather Event',
    'Weed',
    'Insect',
    'Disease',
    'Vertebrate',
    'Nutrient Deficiency',
    'Drainage Installation or Repair'
]

export default {
    name: 'anomalies',
    visibleIf: '{purpose} == "Anomalies"',
    title: 'Anomalies and Disorders',
    elements: [
        {
            name: 'anomalies',
            title: 'Anomalies',
            type: 'matrixdynamic',
            rowCount: 0,
            addRowText: 'Add Anomaly',
            removeRowText: 'Remove Anomaly',
            columns: [
                {
                    name: 'type',
                    title: 'Type',
                    cellType: 'dropdown',
                    isRequired: true,
                    hasOther: true,
                    choices: anomalies
                },
                {
                    name: 'what',
                    title: 'What',
                    cellType: 'text',
                    isRequired: true
                },
                {
                    name: 'when',
                    title: 'When',
                    cellType: 'text',
                    inputType: 'datetime-local',
                    isRequired: true
                },
                {
                    name: 'extent',
                    title: 'Extent',
                    cellType: 'text',
                    isRequired: true
                }
            ]
        },
        {
            name: 'anomalies-panel-0',
            title: 'Photo 1',
            type: 'panel',
            state: 'collapsed',
            elements: [
                {
                    name: 'anomalies-photo-0',
                    title: 'Photo',
                    type: 'file',
                    storeDataAsText: false,
                    acceptedTypes: 'image/*',
                    allowMultiple: false
                },
                {
                    name: 'anomalies-photo-0-label',
                    title: 'Label',
                    type: 'text'
                }
            ]
        },
        {
            name: 'anomalies-panel-1',
            title: 'Photo 2',
            type: 'panel',
            state: 'collapsed',
            elements: [
                {
                    name: 'anomalies-photo-1',
                    title: 'Photo',
                    type: 'file',
                    storeDataAsText: false,
                    acceptedTypes: 'image/*',
                    allowMultiple: false
                },
                {
                    name: 'anomalies-photo-1-label',
                    title: 'Label',
                    type: 'text'
                }
            ]
        }
    ]
}
