import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthRouter from './page/authroute';
import Login from './page/login';
import Register from './page/register';
import BossInfo from './page/bossInfo';
import GeniusInfo from './page/geniusInfo';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRouter></AuthRouter>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/geniusInfo" component={GeniusInfo}></Route>
					<Route path="/bossInfo" component={BossInfo}></Route>
				</Switch>
				
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
