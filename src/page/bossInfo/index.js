import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {update} from '../../redux/user.js';
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor() {
        super();
        this.state={
            job: '',        // 职位
            company: '',    // 公司
            money: '',      // 薪资
            desc: '',       // 职位要求
        }
    }

    handleChange = key => val => {
        this.setState({
            [key]: val
        })
    }

    submit = () => {
        this.props.update(this.state);
    }
    render() {
        const {pathname} = this.props.location;
        const {redirectTo} = this.props;
        return (
            <div>
                
                {
                    redirectTo && redirectTo !== pathname
                        ? (<Redirect to={this.props.redirectTo}></Redirect>)
                        : null
                }
                <NavBar mode="dark">Boss完善信息页面</NavBar>
                <InputItem onChange={this.handleChange('job')}>招聘职位</InputItem>
                <InputItem onChange={this.handleChange('company')}>公司</InputItem>
                <InputItem onChange={this.handleChange('money')}>薪资</InputItem>
                <TextareaItem
                    onChange={this.handleChange('desc')}
                    rows={3}
                    autoHeight
                    title="职位要求"
                >
                </TextareaItem>

                <Button onClick={this.submit}>确认</Button>
            </div>
        );
    }
}

export default BossInfo;