import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from 'cerebral';
import { Container } from '@cerebral/react';
import Devtools from 'cerebral/devtools';

import AppComponent from './App';
import main from './main';

const app = App(main, {
    devtools:
        process.env.NODE_ENV === 'production'
            ? undefined
            : Devtools({ host: 'localhost:8000', reconnect: true }),
    throwToConsole: true,
    noRethrow: false,
    returnSequencePromise: true,
});

// Run init sequence
app.on('initialized:model', () => app.getSequence('init')());

ReactDOM.render(
    <Container app={app}>
        <AppComponent />
    </Container>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
