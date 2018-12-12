import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
@withRouter
class AutnRoute extends React.Component{
    componentDidMount() {
        this.routerPush();
    }

    routerPush = () => {
        // 是否登录
        // /login和/register不需要跳转
        // 用户的type 是boss还是牛人
        const publicList = ['/login', '/register'];
        const {location} = this.props;
        if(publicList.indexOf(location.pathname) > -1) {
            return;
        }
        axios.get('/api/user/info').then(res => {
            if(res.data.code === 200) {

            }else {
                const {history} = this.props;
                console.log(history);
                history.push('/login');
            }
        })
    }
    
    render() {
        return (null);
    }
}

export default AutnRoute;