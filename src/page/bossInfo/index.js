import React from 'react';
import {NavBar, InputItem, TextareaItem} from 'antd-mobile';
import AvaterSelect from '../../Component/avater-select';
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
    render() {
        return (
            <div>
                <NavBar mode="dark">Boss完善信息页面</NavBar>
                <AvaterSelect></AvaterSelect>  
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
            </div>
        );
    }
}

export default BossInfo;