import {Reaction} from 'cerebral';
import {state, props, sequences} from 'cerebral/tags'
import {set, when} from 'cerebral/factories';

import ls from 'local-storage';

export default (paths) => ({
    providers: {
        localstore: {
            get(key) {
                return ls.get(key);
            },

            set(key, val) {
                return ls.set(key, val);
            },
        },
    },

    state:{
        initialized: false,
    },

    sequences: {
        persistState: [
            when(state`store.initialized`), // Wait for init?
            {
                true: ({localstore, props}) => {
                    let {key, val} = props;
                    return {success: localstore.set(key, val)};
                },
                false: [],
            },
        ],
        init: [
            paths.map(path => [
                ({localstore}) => ({val: localstore.get(path)}),
                set(state`${path}`, props`val`),
            ]),
            set(state`store.initialized`, true),
        ],
    },

    reactions: paths.map(path => ({[path] : Reaction(
        {
            val: state`${path}`,
        },
        ({val, get}) => get(sequences`store.persistState`)({key: path, val})
    )})).reduce((obj, reaction) => Object.assign(obj, reaction), {}),
});
