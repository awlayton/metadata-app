// TODO: Should this be here??
import type { IContext } from 'cerebral';

import * as sequences from './sequences';
import * as providers from './providers';
import type { JsonObjectProperty, PageModel } from 'survey-react';

interface Page extends PageModel {
    //choices: string[];
    error: string;
}

export type State = {
    initialized: boolean;
    loggedin: boolean | null;
    appdataId: string | null;
    resultsId: string | null;
    submitting: boolean;
    navigationOpen: boolean;
    confirmSubmitOpen: boolean;
    droneQRScannerActive: boolean;
    sensorQRScannerActive: boolean;
    surveyData: null;
    pastData: any[];
    pages: Page[];
    pageNum: number;
    questions: {
        showNavigationButtons: false;
        goNextPageAutomatic: true;
        clearInvisibleValues: 'onHidden';
        checkErrorsMode: 'onValueChanged';
        pages: JsonObjectProperty[];
    };
};

export type Sequences = {
    [key in keyof typeof sequences]: typeof sequences[key];
};

export type Providers = {
    [key in keyof typeof providers]: typeof providers[key];
};

export type Context<Props = {}> = IContext<Props & State> & Providers;
