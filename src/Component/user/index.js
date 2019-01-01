import React from 'react';
import {connect} from 'react-redux';
import {Result, List, Button} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user';
import {Redirect} from 'react-router-dom'
import './index.css';
@connect(
    state=> state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        this.props.logoutSubmit()
        browserCookie.erase('userId');
    }
    render() {
        const {props} = this;
        const {redirectTo} = props;
        const Item = List.Item;
        const Brief = Item.Brief;
        const {patnanme} = this.props.location
        return (
            <div>
                {
                    props.user
                        ? (
                            
                            <div>
                                
                                <Result 
                                    title={props.user}
                                    message={props.type==='boss'?props.company:null}
                                />
                                <List>
                                    <Item>
                                        {props.title}
                                        <Brief>{props.desc}</Brief>
                                        {props.money}
                                    </Item>
                                </List>

                                <Button className="btn" onClick={this.logOut}>退出登录</Button>
                            </div>
                        )
                        : (
                            redirectTo&&(patnanme!==redirectTo)?(<Redirect to={redirectTo}></Redirect>): null
                        )
                }
                
            </div>
        )
    }
}

export default User;