import { state, Compute } from 'cerebral';

import forin from 'lodash.forin';
import isequal from 'lodash.isequal';

import { State } from './types';
import unanswered from '../unanswered';

export const canSubmit = Compute(
    (get) =>
        get(state`initialized`) &&
        get(state`loggedin`) &&
        !get(state`submitting`) &&
        !get<State['pages']>(state`pages`).some((page) => page.error)
);

export const canNext = Compute((get) => {
    let page = get(state`pageNum`);
    let pages = get(state`pages`);

    return page < pages.length - 1 && !pages[page].error;
});

export const canPrev = Compute((get) => {
    let page = get(state`pageNum`);

    return page > 0;
});

// Compute previous answers
// Sorted in reverse chronological order, unique answers only
export const pastAnswers = Compute((get) => {
    let data = get(state`pastData`);

    let ans: Record<string, unknown[]> = {};
    forin(data, (row) =>
        forin(row, (val, key) => {
            if (unanswered(val)) {
                return;
            }

            if (Array.isArray(val)) {
                return val.map(addAnswer);
            } else {
                return addAnswer(val);
            }

            function addAnswer(val: unknown) {
                if (!ans[key]) {
                    ans[key] = [val];
                } else if (!ans[key].some((ans) => isequal(ans, val))) {
                    ans[key].unshift(val);
                }
            }
        })
    );

    return ans;
});
