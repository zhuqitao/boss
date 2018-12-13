import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../redux/user';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';


const {RadioItem} = Radio;
@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',           // 用户名字
            pwd: '',            // 密码
            repeatPwd: '',      // 确认密码
            type: 'genius',     // genuis: 牛人, boss: 老板
        }
    }

    handleChange = key => value => {
        this.setState({
            [key]: value
        })
    }
    radioChange = value => e => {
        this.setState({
            type: value
        })
    }

    handleRegister = () => {
        this.props.register(this.state);
    }

    render() {
        const {type} = this.state;
        const {redirectTo} = this.props;
        return (
            <div>
                {
                    redirectTo
                    ? (<Redirect to={redirectTo} />)
                    : null
                }
                <WingBlank>
                    <h2>注册页面</h2>
                    <List>
                        <InputItem onChange={this.handleChange('user')}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type="password"
                            onChange={this.handleChange('pwd')}
                        >
                            密码：
                        </InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type="password"
                            onChange={this.handleChange('repeatPwd')}
                        >
                            确认密码：
                        </InputItem>
                        <WhiteSpace />
                        <RadioItem 
                            name="type"
                            checked={type === 'genius'}
                            onChange={this.radioChange('genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem 
                            name="type"
                            checked={type === 'boss'}
                            onChange={this.radioChange('boss')}
                        >
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;