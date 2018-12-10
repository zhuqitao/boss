import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
@withRouter
class AutnRoute extends React.Component{
    componentDidMount() {
        // 是否登录
        // /login和/register不需要跳转
        // 用户的type 是boss还是牛人
        axios.get('/user/info').then(res => {
            if(res.data.code === 200) {

            }else {
                const {history} = this.props;
                console.log(history);
                history.push('/login');
            }
        })
    }
    
    render() {
        return (<div>auth</div>)
    }
}

export default AutnRoute;