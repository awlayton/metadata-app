import {state} from 'cerebral/tags';

export const canSubmit = get =>
        get(state`submitting`) || !get(state`pages`).some(page => page.error);
