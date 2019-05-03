const anomalies = [
    'Weather Event',
    'Weed',
    'Insect',
    'Disease',
    'Vertebrate',
    'Nutrient Deficiency',
    'Drainage Installation or Repair',
];

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
                    choices: anomalies,
                },
                {
                    name: 'what',
                    title: 'What',
                    cellType: 'text',
                    isRequired: true,
                },
                {
                    name: 'when',
                    title: 'When',
                    cellType: 'text',
                    inputType: 'datetime-local',
                    isRequired: true,
                },
                {
                    name: 'extent',
                    title: 'Extent',
                    cellType: 'text',
                    isRequired: true,
                },
            ],
        },
    ],
};
