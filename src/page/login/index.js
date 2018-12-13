import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styles from "./index.module.css";
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {login} from '../../redux/user'
@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {
    constructor(){
        super();
        this.state={
            user: '',
            pwd: '',
        }
    }
    componentDidMount() {
        
    }

    handleChange = key => value => {
        this.setState({
            [key]: value
        })
    }

    handleLogin = () => {
        this.props.login(this.state);
    }

    register = () => {
        const {history} = this.props;
        history.push('/register');
    }
    
    render() {
        const {redirectTo} = this.props;
        return (
            <div className={styles.login}>
                {
                    redirectTo
                    ? (<Redirect to={redirectTo} />)
                    : null
                }
                <WingBlank>
                    <h2>登录页面</h2>
                    <List>
                        <InputItem onChange={this.handleChange('user')}>用户：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={this.handleChange('pwd')} type="password">密码：</InputItem>
                        <Button 
                            type="primary"
                            onClick={this.handleLogin}
                        >
                            登录
                        </Button>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
};

export default Login