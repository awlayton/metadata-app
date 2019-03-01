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

let gapiP = Promise.resolve(googleapi())
    // Load client library
    .tap(({load}) => new Promise((resolve, reject) => load('client', {
        callback: resolve,
        onerror: reject,
        timeout: 10000,
        ontimeout: reject,
    })))
    // Initialize client (load sheets and drive APIs)
    .tap(({client}) => new Promise((resolve, reject) => client.init({
        //scope: 'https://www.googleapis.com/auth/drive.file',
        //clientId: '971551995245-9fmoq64cftrk371tft6qutehpn4i04b9.apps.googleusercontent.com',
        discoveryDocs: [ 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest', 'https://sheets.googleapis.com/$discovery/rest?version=v4' ],
    }).then(() => resolve(), reject)));
export const googlesheets = {
    async createSheet() {
        // Request needed scopes from user
        let gapi = await gapiP.tap(({auth2}) => auth2.getAuthInstance().currentUser.get().grant({
            scope: 'https://www.googleapis.com/auth/drive.file',
        }));

        return await (gapi.client.sheets.spreadsheets.create({}, {}));
    }
};
