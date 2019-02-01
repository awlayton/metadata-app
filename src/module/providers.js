//import Promise from 'bluebird';
//import {state} from 'cerebral';
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
