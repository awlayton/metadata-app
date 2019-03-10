import Promise from 'bluebird';
//import {state} from 'cerebral';
import googleapi from 'google-client-api';
import XLSX from 'xlsx';

import * as errors from './errors';
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

            throw new errors.GetLocationError(msg);
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
                        logout && this.context.get(logout)();
                    } else {
                        let user = auth.currentUser.get().getBasicProfile();
                        login && this.context.get(login)({
                            name: user.getName(),
                        });
                    }
                };

                auth.isSignedIn.listen(listener);
                listener(auth.isSignedIn.get());
            });
        await gapi;
    },

    async get(scope) {
        return gapi
            .tap(({auth2}) => {
                let user = auth2.getAuthInstance().currentUser.get();

                // Request needed scopes from user
                if (!user.hasGrantedScopes(scope)) {
                   return user.grant({scope});
                }
            })
            .get('client');
    },

    async disconnect() {
        (await gapi).auth2.getAuthInstance().currentUser.get().disconnect();
    },
}
const appdataScope = [
    'https://www.googleapis.com/auth/drive.appdata',
    //'https://www.googleapis.com/auth/drive.file',
].join(' ');
export const googleappdata = {
    async getData() {
        let {drive} = await this.context.gapiClient.get(appdataScope);

        let result;
        try {
            ({result} = await drive.files.list({
                spaces: 'appDataFolder',
                q: "name='config.json'",
                fields: 'files(id, appProperties)',
            }));
        } catch (err) {
            throw new errors.GAPIError(err);
        }

        return result.files[0] && result.files[0].appProperties;
    },

    async initData({body = {}}) {
        let {drive} = await this.context.gapiClient.get(appdataScope);

        try {
            let {result} = await drive.files.create({
                resource: {
                    name: 'config.json',
                    mimeType: 'application/json',
                    parents: ['appDataFolder'],
                    appProperties: body,
                },
            });
            return result;
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },
}
const sheetsScope = 'https://www.googleapis.com/auth/drive.file';
export const googlesheets = {
    async createSheet() {
        let {sheets} = await this.context.gapiClient.get(sheetsScope);

        try {
            let {result} = await sheets.spreadsheets.create({}, {});
            return result;
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },

    async getSheet(id) {
        let {sheets} = await this.context.gapiClient.get(sheetsScope);

        let result;
        try {
            ({result} = await sheets.spreadsheets.values.get({
                spreadsheetId: id,
                range: ['Sheet1'],
            }));
        } catch (err) {
            throw new errors.GAPIError(err);
        }

        if (!result.values) {
            return [];
        }

        let sheet = XLSX.utils.aoa_to_sheet(result.values);
        return XLSX.utils.sheet_to_json(sheet);
    },

    async writeSheet(id, data) {
        const sheetsURL = 'https://docs.google.com/spreadsheets';
        let {sheets} = await this.context.gapiClient.get(sheetsScope);

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
            let row = data.length + 1;
            return {
                ...result,
                // TODO: How to better handle URL from ID etc.?
                resultsUrl: `${sheetsURL}/d/${id}#gid=0&range=${row}:${row}`
            };
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },

    async addRow(id, cols, row) {
        let {sheets} = await this.context.gapiClient.get(sheetsScope);

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

// TODO: Better way to handle arrays and such in a spreadsheet?
export const serialize = {
    serialize(data) {
        return data.map((result, i) => {
            let serialized = {};
            Object.keys(result).forEach(key => {
                try {
                    if (typeof result[key] === 'object') {
                        if (result[key]) {
                            let kkey = '$$' + key;
                            serialized[kkey] = JSON.stringify(result[key]);
                        }
                    } else {
                        serialized[key] = result[key];
                    }
                } catch (err) {
                    throw new errors.SerializeError(i, key, err);
                }
            });
            return serialized;
        });
    },

    deserialize(data) {
        return data.map((result, i) => {
            let deserialized = {};
            Object.keys(result).forEach(key => {
                try {
                    if (key.startsWith('$$')) {
                        if (result[key]) {
                            let kkey = key.substring(2);
                            deserialized[kkey] = JSON.parse(result[key]);
                        }
                    } else {
                        deserialized[key] = result[key];
                    }
                } catch (err) {
                    // +2 is for header row and 1 vs 0 indexing
                    throw new errors.DeserializeError(i + 2, key, err);
                }
            });
            return deserialized;
        });
    },
};
