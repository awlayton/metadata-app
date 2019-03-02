import {Reaction} from 'cerebral';
import {state, props, sequences} from 'cerebral/tags'
import {set, merge, when} from 'cerebral/factories';

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

            clear() {
                return ls.clear();
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
            // Load each path from store and set it in state
            paths.map(path => [
                ({localstore}) => ({val: localstore.get(path)}),
                when(props`val`, val => val && typeof val === 'object'),
                {
                    true: [merge(state`${path}`, props`val`)],
                    false: [set(state`${path}`, props`val`)],
                }
            ]),
            set(state`store.initialized`, true),
        ],
    },

    // Generate a reaction for each path in the store
    reactions: paths.map(path => ({[path] : Reaction(
        {
            val: state`${path}`,
        },
        ({val, get}) => get(sequences`store.persistState`)({key: path, val})
    )})).reduce((obj, reaction) => Object.assign(obj, reaction), {}),
});
