import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from "react-router";

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import './index.css';
import App from './components/main/App';
import Login from './components/main/Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
		<Router history={browserHistory}>
	        <Route path='/' component={App} />
	        <Route path='/login' component={Login} />
		</Router>
	, document.getElementById('root'));
registerServiceWorker();
