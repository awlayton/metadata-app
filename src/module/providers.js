import Promise from 'bluebird';
//import {state} from 'cerebral';
import googleapi from 'google-client-api';

import {GetLocationError} from './errors';
import model from '../surveyModel';

export const geolocation = {
    async getCurrentLoc() {
        try {
            return await new Promise((resolve, reject) =>
                    navigator.geolocation.getCurrentPosition(resolve, reject))
                .then(pos => pos.coords);
        } catch (err) {
            let msg;

            switch (err.code) {
                case 1: // PERMISSION_DENIED
                    msg = 'Permission denied';
                    break;
                case 2: // POSITION_UNAVAILABLE
                    msg = 'Position unavailable';
                    break;
                case 3: // TIMEOUT
                    msg = 'Timeout obtaining position';
                    break;
                default:
                    msg = 'Unknown error';
            }

            throw new GetLocationError(msg);
        }
    }
};

export const survey = {
    setAnswer(name, value) {
        model.model.setValue(name, value);
    },

    setPage(num) {
        model.model.currentPageNo = num;
    },

    nextPage() {
        return model.model.nextPage();
    },

    previousPage() {
        return model.model.prevPage();
    },

    setData(data) {
        model.model.data = data;
    },

    submit() {
        return model.model.completeLastPage();
    },
};

let client = new Promise(async (resolve, reject) => {
	let gapi = await googleapi();
	return gapi.load('client', {
		callback: () => resolve(gapi.client),
		onerror: reject,
		ontimout: reject,
	});
}).tap(client => client.init({
	scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets',
	clientId: '971551995245-9fmoq64cftrk371tft6qutehpn4i04b9.apps.googleusercontent.com'
}));
export const googlesheets = {
	async createSheet() {

		console.dir(await client)
		return (await client).sheets.spreadsheets.create();
	}
};
