import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from "react-router";

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import './index.css';
import App from './components/main/App';
import Login from './components/login/Login';
import About from './components/about/About';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
		<Router history={browserHistory}>
	        <Route path='/' component={App} />
	        <Route path='/login' component={Login} />
	        <Route path='/about' component={About} />
		</Router>
	, document.getElementById('root'));
registerServiceWorker();
