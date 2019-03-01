import Promise from 'bluebird';
//import {state} from 'cerebral';
import googleapi from 'google-client-api';
import XLSX from 'xlsx';

import {GetLocationError, GAPIError} from './errors';
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

let client;
let gapi;
export const gapiClient = {
    // Do one-time gapi setup not effected by login/logout
    async init({login, logout}) {
        gapi = Promise.resolve(googleapi())
            // Load client library
            .tap(({load}) => new Promise((resolve, reject) => load('client', {
                callback: resolve,
                onerror: reject,
                timeout: 10000,
                ontimeout: reject,
            })))
            // Initialize client (load sheets and drive APIs)
            .tap(({client}) => client.init({
                discoveryDocs: [
                    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
                    'https://sheets.googleapis.com/$discovery/rest?version=v4'
                ],
            }))
            // Listen for login/logout
            .tap(({auth2}) => {
                let auth = auth2.getAuthInstance();
                let listener = signedIn => {
                    if (!signedIn) {
                        client = undefined;
                        logout && this.context.get(logout)();
                    } else {
                        login && this.context.get(login)();
                    }
                };

                auth.isSignedIn.listen(listener);
                listener(auth.isSignedIn.get());
            });
        await gapi;
    },

    async get() {
        if (client) {
            return client;
        }

        client = await gapi
            // Request needed scopes from user
            .tap(({auth2}) => {
                const grants = {
                    scope: 'https://www.googleapis.com/auth/drive.file',
                };
                let auth = auth2.getAuthInstance();

                return auth.currentUser.get().grant(grants);
            })
            .get('client');

        return client;
    }
}
export const googlesheets = {
    async createSheet() {
        let {sheets} = await this.context.gapiClient.get();

        try {
            let {result} = await sheets.spreadsheets.create({}, {});
            return result;
        } catch ({result}) {
            throw new GAPIError(result);
        }
    },

    async getSheet(id) {
        let {sheets} = await this.context.gapiClient.get();

        let result;
        try {
            ({result} = await sheets.spreadsheets.values.get({
                spreadsheetId: id,
                range: ['Sheet1'],
            }));
        } catch (error) {
            throw new GAPIError({error});
        }

        if (!result.values) {
            return [];
        }

        let sheet = XLSX.utils.aoa_to_sheet(result.values);
        return XLSX.utils.sheet_to_json(sheet);
    },

    async writeSheet(id, data) {
        let {sheets} = await this.context.gapiClient.get();

        // Format data with spreadsheet lib
        let sheet = XLSX.utils.json_to_sheet(data);
        let values = XLSX.utils.sheet_to_json(sheet, {header: 1});

        try {
            let {result} = await sheets.spreadsheets.values.update({
                spreadsheetId: id,
                range: sheet['!ref'],
                valueInputOption: 'USER_ENTERED', // 'RAW'
                includeValuesInResponse: false,
            }, {
                majorDimension: 'ROWS',
                values,
            });
            return result;
        } catch ({result}) {
            throw new GAPIError(result);
        }
    },

    async addRow(id, cols, row) {
        let {sheets} = await this.context.gapiClient.get();

        return sheets.spreadsheets.values.append({
            spreadsheetId: id,
            valueInputOption: 'USER_ENTERED', // 'RAW'
            insertDataOption: 'INSERT_ROWS', // 'OVERWRITE'
            includeValuesInResponse: false,
        }, {
            majorDimension: 'ROWS',
            values: [row],
        });
    },
};
