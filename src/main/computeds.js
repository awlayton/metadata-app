import {state} from 'cerebral/tags';

export const canSubmit = get =>
        get(state`initialized`) &&
        get(state`loggedin`) &&
        !get(state`submitting`) &&
        !get(state`pages`).some(page => page.error);

export const canNext = get => {
    let page = get(state`pageNum`);
    let pages = get(state`pages`);

    return page < (pages.length - 1) && !pages[page].error;
}

export const canPrev = get => {
    let page = get(state`pageNum`);

    return page > 0;
}
