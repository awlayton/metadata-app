export default {
    name: 'place',
    title: 'Place',
    //visibleIf: '{purpose} == "UAV"',
    elements: [
        {
            name: 'client',
            title: 'Grower (or Client)',
            type: 'text',
            placeHolder: 'Farmer Frank',
            autofill: 'lastused',
        },
        {
            name: 'operation',
            title: 'Farm (or Operation)',
            type: 'text',
            placeHolder: 'Frank Farms',
        },
        {
            name: 'site',
            title: 'Field (or Site)',
            type: 'text',
            placeHolder: 'East Field',
        },
        {
            name: 'crop',
            title: 'Crop',
            type: 'text',
            placeHolder: 'corn',
        },
        {
            name: 'prev-crop',
            title: 'Previous Crop',
            type: 'text',
            placeHolder: 'beans',
        },
        {
            name: 'weather',
            title: 'Weather',
            type: 'panel',
            elements: [
                {
                    name: 'weather-button',
                    title: 'Get Current Weather',
                    type: 'html',
                    visible: false,
                    // TODO: Implement functionality for button
                    cerebralbutton: 'setCurrentWeather',
                },
                {
                    name: 'temperature',
                    title: 'Temperature',
                    type: 'text',
                    inputType: 'number',
                    autofill: 'temperature',
                    //inputType: 'number',
                    placeHolder: '60 F'
                },
                {
                    name: 'windspeed',
                    title: 'Wind Speed',
                    type: 'text',
                    autofill: 'windspeed',
                    //inputType: 'number',
                    placeHolder: '10 mph',
                },
                {
                    name: 'winddirection',
                    title: 'Wind Direction',
                    type: 'text',
                    autofill: 'winddirection',
                    //inputType: 'number',
                    placeHolder: '35 deg',
                },
            ],
        },
    ],
};
