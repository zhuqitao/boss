import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthRouter from './page/authroute';
import Login from './page/login';
import Register from './page/register';
import BossInfo from './page/bossInfo';
import GeniusInfo from './page/geniusInfo';
import Chat from './Component/chat';
import Dashboard from './Component/dashboard'
class App extends React.Component{
    render() {
        return (
            <div>
				<AuthRouter></AuthRouter>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/geniusInfo" component={GeniusInfo}></Route>
					<Route path="/bossInfo" component={BossInfo}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
				</Switch>
			</div>
        )
    }
}

export default App;