
import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {update} from '../../redux/user.js';
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component{
    constructor() {
        super();
        this.state={
            title: '',        // 职位
            desc: '',       // 个人简介
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
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <InputItem onChange={this.handleChange('title')}>求职岗位</InputItem>
                <TextareaItem
                    onChange={this.handleChange('desc')}
                    rows={3}
                    autoHeight
                    title="个人简介"
                >
                </TextareaItem>

                <Button onClick={this.submit}>确认</Button>
            </div>
        );
    }
}

export default GeniusInfo;