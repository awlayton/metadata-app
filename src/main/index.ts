import localstore from './modules/localstore';

import type { ModuleDefinition } from 'cerebral';
import type { State, Sequences } from './types';
import * as providers from './providers';
import * as sequences from './sequences';
import * as computeds from './computeds';
//import * as errors from './errors';

// TODO: Should this be here??
import pages from '../pages';

// Parts of state to keep in localstorage
const store = localstore(['pageNum', 'surveyData']);

const state: State = {
    ...computeds,
    initialized: false,
    loggedin: null,
    appdataId: null,
    resultsId: null,
    submitting: false,
    navigationOpen: false,
    confirmSubmitOpen: false,
    droneQRScannerActive: false,
    sensorQRScannerActive: false,
    surveyData: null,
    pastData: [],
    pages: [],
    pageNum: 0,
    questions: {
        showNavigationButtons: false,
        goNextPageAutomatic: true,
        clearInvisibleValues: 'onHidden',
        checkErrorsMode: 'onValueChanged',
        pages,
    },
};

/**
 * React App breaks with a var named module...
 */
const _module: ModuleDefinition<State, Sequences> = {
    sequences,
    state,
    catch: [
        // TODO: Pop up toast or something about giving permission?
        //[errors.GetLocationError, ({error}) => console.error(error)],
        //[Error, ({error}) => console.error(error)],
        [Error, sequences.displayError],
    ],
    providers,
    modules: {
        store,
        //storage,
    },
};

export default _module;
