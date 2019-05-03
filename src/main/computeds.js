import {state} from 'cerebral/tags';

import forin from 'lodash.forin';

import unanswered from '../unanswered';

export const canSubmit = get =>
        get(state`initialized`) &&
        get(state`loggedin`) &&
        !get(state`submitting`) &&
        !get(state`pages`).some(page => page.error);

export const canNext = get => {
    let page = get(state`pageNum`);
    let pages = get(state`pages`);

    return page < (pages.length - 1) && !pages[page].error;
};

export const canPrev = get => {
    let page = get(state`pageNum`);

    return page > 0;
};

// Compute previous answers
// Sorted in reverse chronological order, unique answers only
export const pastAnswers = get => {
    let data = get(state`pastData`);

    let ans = {};
    forin(data, row => forin(row, (val, key) => {
        if (unanswered(val)) {
            return;
        }

        if (!ans[key]) {
            ans[key] = [val];
        } else if (!ans[key].includes(val)) {
            ans[key].unshift(val);
        }
    }));

    return ans;
};
