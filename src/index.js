import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Controller } from 'cerebral';
import { Container } from '@cerebral/react';
import devtools from 'cerebral/devtools';

import App from './App';
import Module from './module';

const controller = Controller(Module, {
    devtools: process.env.NODE_ENV === 'production' ?
        null : devtools({host: 'localhost:8000', reconnect: true})
});

ReactDOM.render(
    <Container controller={controller}>
		<App />
	</Container>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
