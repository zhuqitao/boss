import React from 'react';
import styles from "./index.module.css";
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            test: {}
        }
    }
    componentDidMount() {
        
    }

    register = () => {
        const {history} = this.props;
        history.push('/register');
    }
    
    render() {
        return (
            <div className={styles.login}>
                <h2>登录页面</h2>
                <WingBlank>
                    <InputItem>用户：</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem>密码：</InputItem>
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
};

export default Login