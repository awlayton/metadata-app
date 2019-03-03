import {Reaction} from 'cerebral';
import {state, moduleState, props, sequences} from 'cerebral/tags'
import {set, merge, when, parallel} from 'cerebral/factories';

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
            when(moduleState`initialized`), // Wait for init?
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
            parallel('get paths', paths.map(path => [
                ({localstore}) => ({val: localstore.get(path)}),
                when(props`val`, val => val && typeof val === 'object'),
                {
                    true: [merge(state`${path}`, props`val`)],
                    false: [set(state`${path}`, props`val`)],
                }
            ])),
            set(moduleState`initialized`, true),
        ],
    },

    // Generate a reaction for each path in the store
    reactions: paths.map(path => {
        let reaction = Reaction(
            {
                val: state`${path}`,
            },
            // TODO: Why didn't using moduleSequences work??
            //({val, get}) => get(moduleSequences`persistState`)({key: path, val})
            ({val, get}) => {
                const path = reaction.modulePath.join('.');
                const sequence = get(sequences`${path}.persistState`);
                return sequence({key: path, val});
            }
        );
        return {[path]: reaction};
    }).reduce((obj, reaction) => Object.assign(obj, reaction), {}),
});
