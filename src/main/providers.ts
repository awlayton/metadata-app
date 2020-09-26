import Bluebird from 'bluebird';
//import {state} from 'cerebral';
import googleapi, { GAPI } from 'google-client-api';
import XLSX from 'xlsx';
import axios from 'axios';
import ducky, { AST } from 'ducky';

import * as errors from './errors';
import model from '../surveyModel';
import scope from '../googleScopes';

import describe from '../describe';
import { Context } from './types';

export const geolocation = {
    async getCurrentLoc() {
        try {
            return await new Promise<Position>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            ).then((pos) => pos.coords);
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
    },
};

export const survey = {
    setAnswer(name: string, value: any) {
        model.model?.setValue(name, value);
    },

    setPage(num: number) {
        model.model!.currentPageNo = num;
    },

    nextPage() {
        return model.model?.nextPage();
    },

    previousPage() {
        return model.model?.prevPage();
    },

    setData(data: any) {
        model.model!.data = data;
    },

    submit() {
        return model.model?.completeLastPage();
    },
};

let gapi: Bluebird<GAPI>;
export const gapiClient = {
    // Do one-time gapi setup not effected by login/logout
    async init({
        login,
        logout,
    }: {
        login: (data: { name: string }) => void;
        logout: () => void;
    }) {
        gapi = Bluebird.resolve(googleapi())
            // Load client library
            .tap(
                ({ load }) =>
                    new Promise((resolve, reject) =>
                        load('client', {
                            callback: resolve,
                            onerror: reject,
                            timeout: 10000,
                            ontimeout: reject,
                        })
                    )
            )
            // Initialize client (load sheets and drive APIs)
            .tap(({ client }) =>
                client.init({
                    discoveryDocs: [
                        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
                        'https://sheets.googleapis.com/$discovery/rest?version=v4',
                    ],
                    scope,
                })
            )
            // Listen for login/logout
            .tap(({ auth2 }) => {
                let auth = auth2.getAuthInstance();
                let listener = (signedIn: boolean) => {
                    if (!signedIn) {
                        // @ts-ignore
                        logout && this.context.get(logout)();
                    } else {
                        let user = auth.currentUser.get().getBasicProfile();
                        login &&
                            // @ts-ignore
                            this.context.get(login)({
                                name: user.getName(),
                            });
                    }
                };

                auth.isSignedIn.listen(listener);
                listener(auth.isSignedIn.get());
            });
        await gapi;
    },

    async get(_scope?: string) {
        // TODO: Fix/remove code for incremental scopes?
        return gapi
            .tap(({ auth2 }) => {
                let user = auth2.getAuthInstance().currentUser.get();

                // Request needed scopes from user
                if (!user.hasGrantedScopes(scope)) {
                    return user.grant({ scope });
                }
            })
            .get('client');
    },

    async disconnect() {
        (await gapi).auth2.getAuthInstance().currentUser.get().disconnect();
    },
};
const appdataScope = [
    'https://www.googleapis.com/auth/drive.appdata',
    //'https://www.googleapis.com/auth/drive.file',
].join(' ');
export const googleappdata = {
    async getData() {
        // @ts-ignore
        const { context }: { context: Context } = this;
        const { drive } = await context.gapiClient.get(appdataScope);

        let files: gapi.client.drive.File[] | undefined;
        try {
            ({
                result: { files },
            } = await drive.files.list({
                spaces: 'appDataFolder',
                q: "name='config.json'",
                fields: 'files(id, appProperties)',
            }));
        } catch (err) {
            throw new errors.GAPIError(err);
        }

        let file = files?.[0] ?? {};
        return {
            data: file.appProperties,
            id: file.id,
        };
    },

    async initData({ body = {} }) {
        // @ts-ignore
        const { context }: { context: Context } = this;
        let { drive } = await context.gapiClient.get(appdataScope);

        try {
            let { result } = await drive.files.create({
                resource: {
                    name: 'config.json',
                    mimeType: 'application/json',
                    parents: ['appDataFolder'],
                    appProperties: body,
                    // @ts-ignore
                    fields: 'id',
                },
            });
            return result.id;
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },

    async updateData({ body = {}, id }: { body: {}; id: string }) {
        // @ts-ignore
        const { context }: { context: Context } = this;
        let { drive } = await context.gapiClient.get(appdataScope);

        try {
            let { result } = await drive.files.update({
                fileId: id,
                resource: {
                    name: 'config.json',
                    mimeType: 'application/json',
                    appProperties: body,
                },
            });
            return result;
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },
};
const sheetsScope = 'https://www.googleapis.com/auth/drive.file';
// Decide sheet version based on semver
const { semver } = describe;
const sheetVer = semver.major || semver.minor / 10;
export const googlesheets = {
    async createSheet() {
        // @ts-ignore
        const { context }: { context: Context } = this;
        let { sheets } = await context.gapiClient.get(sheetsScope);

        const ver = googlesheets.getVersion();
        const properties = {
            title: `${process.env.REACT_APP_NAME} metadata uploads v${ver}`,
        };
        try {
            let { result } = await sheets.spreadsheets.create({
                // @ts-ignore
                properties,
            });
            return result;
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },

    getVersion() {
        return sheetVer;
    },

    async getSheet(id: string) {
        // @ts-ignore
        const { context }: { context: Context } = this;
        let { sheets } = await context.gapiClient.get(sheetsScope);

        let result;
        try {
            ({ result } = await sheets.spreadsheets.values.get({
                spreadsheetId: id,
                // @ts-ignore
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

    async writeSheet(id: string, data: unknown[]) {
        // @ts-ignore
        const { context }: { context: Context } = this;
        const sheetsURL = 'https://docs.google.com/spreadsheets';
        let { sheets } = await context.gapiClient.get(sheetsScope);

        // Format data with spreadsheet lib
        let sheet = XLSX.utils.json_to_sheet(data);
        let values = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });

        try {
            let { result } = await sheets.spreadsheets.values.update(
                {
                    spreadsheetId: id,
                    range: sheet['!ref'] ?? '',
                    valueInputOption: 'USER_ENTERED', // 'RAW'
                    includeValuesInResponse: false,
                },
                {
                    majorDimension: 'ROWS',
                    values,
                }
            );
            let row = data.length + 1;
            return {
                ...result,
                // TODO: How to better handle URL from ID etc.?
                resultsUrl: `${sheetsURL}/d/${id}#gid=0&range=${row}:${row}`,
            };
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },

    async addRow(id: string, row: any) {
        // @ts-ignore
        const { context }: { context: Context } = this;
        let { sheets } = await context.gapiClient.get(sheetsScope);

        return sheets.spreadsheets.values.append(
            // @ts-ignore
            {
                spreadsheetId: id,
                valueInputOption: 'USER_ENTERED', // 'RAW'
                insertDataOption: 'INSERT_ROWS', // 'OVERWRITE'
                includeValuesInResponse: false,
            },
            {
                majorDimension: 'ROWS',
                values: [row],
            }
        );
    },
};
const driveFilesUrl = 'https://www.googleapis.com/upload/drive/v3/files/';
export const googledrive = {
    async upload(file: File) {
        // @ts-ignore
        const { context }: { context: Context } = this;
        let { drive } = await context.gapiClient.get();

        try {
            let { result } = await drive.files.create({
                resource: {
                    name: file.name,
                    mimeType: file.type,
                },
                fields: 'id',
            });

            // TODO: You really can't sent the body with gapi??? wtf
            let token = (await context.gapiClient.get()).getToken();
            await fetch(driveFilesUrl + result.id, {
                method: 'PATCH',
                headers: new Headers({
                    'Authorization': `Bearer ${token['access_token']}`,
                    'Content-Type': file.type,
                }),
                body: file,
            });

            return `https://docs.google.com/uc?export=download&id=${result.id}`;
        } catch (err) {
            throw new errors.GAPIError(err);
        }
    },
};

// TODO: Better way to handle arrays and such in a spreadsheet?
const fileResult = ducky.validate.compile(
    '[ { content: string, name: string, type: string } ]'
) as AST<[{ content: string; name: string; type: string }]>;
export const serialize = {
    serialize(data: Record<string, unknown>[]) {
        return data.map((result, i) => {
            let serialized: Record<string, any> = {};
            Object.keys(result).forEach((key) => {
                try {
                    const val = result[key];
                    if (val && typeof val === 'object') {
                        if (ducky.validate.execute(val, fileResult)) {
                            /* TODO: Make IMAGE work in google sheets?
                            serialized[key] =
                                    `=IMAGE("${result[key][0].content}",3)`;
                            */
                            serialized[key] = val[0].content;
                        } else if (result[key]) {
                            let kkey = '$$' + key;
                            serialized[kkey] = JSON.stringify(result[key]);
                        }
                    } else {
                        serialized[key] = val;
                    }
                } catch (err) {
                    throw new errors.SerializeError(i, key, err);
                }
            });
            return serialized;
        });
    },

    deserialize(data: Record<string, any>[]) {
        return data.map((result, i) => {
            let deserialized: Record<string, unknown> = {};
            Object.keys(result).forEach((key) => {
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

/**
 * @see {@link https://openweathermap.org/current#geo}
 */
const openweather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    url: '/weather',
    method: 'get',
});
openweather.interceptors.request.use(({ params, ...rest }) => {
    // Add default params to config
    return {
        params: {
            // WARNING: The order of these matters to the API...
            ...params,
            units: 'imperial', // Use US customary units
            appid: process.env.REACT_APP_OPENWEATHER_KEY,
        },
        ...rest,
    };
});
export const weather = {
    async current(query: string | { lat: string; lon: string }) {
        const { data } = await openweather({ params: query });
        return data;
    },
};
