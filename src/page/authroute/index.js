import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user';
import axios from 'axios';
@withRouter
@connect(
    null,
    {loadData}
)
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
            console.log(res);
            if(res.data.code === 0) {
                const {loadData} = this.props;
                loadData(res.data.data);
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