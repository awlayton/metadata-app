export default {
    name: 'spraying-chemicals',
    title: 'Chemicals',
    visibleIf: '{purpose} == "Spraying"',
    elements: ['Herbicide', 'Insecticide', 'Fungicide', 'Fertilizer'].map(
        (chem) => ({
            name: `spraying-chemicals-${chem.toLowerCase()}s`,
            title: `${chem}s`,
            type: 'paneldynamic',
            panelCount: 0,
            panelAddText: `Add ${chem}`,
            panelRemoveText: `Remove ${chem}`,
            autofill: 'lastused',
            templateTitle: `${chem} #{panelIndex}`,
            templateElements: [
                {
                    name: `spraying-checmicals-${chem.toLowerCase()}s-product`,
                    valueName: 'product',
                    title: 'Product Name',
                    type: 'text',
                    isRequired: true,
                },
                {
                    name: `spraying-checmicals-${chem.toLowerCase()}s-amount`,
                    valueName: 'amount',
                    title: 'Amount per Acre (this product)',
                    type: 'text',
                    inputType: 'number',
                    isRequired: true,
                },
            ],
        })
    ),
};
