import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import NavLinkNBar from '../navlink';
import {Switch, Route} from 'react-router-dom';
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat'
import { styles } from './index.module.scss';
import Boss from '../boss';
import Genius from '../genius';
import User from '../user';
import Msg from '../msg';

@connect(
    state => state,
    {getMsgList, recvMsg}
)
class Dashboardl extends React.Component {
    constructor(props) {
        super(props); 
        this.state={}
    }

    componentDidMount() {
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
        
    }
    
    
    render() {
        
        
        
        
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type==='geniius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type==='boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User,
            },
        ]

        const {pathname} = this.props.location;
        return (
            <div>
                
                <NavBar mode='dard' className="navbar">
                    {navList.find(v=>v.path===pathname).title}
                </NavBar>
                <div>
                    <Switch>
                        {navList.map(v=> (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>

                <NavLinkNBar data={navList}></NavLinkNBar>


                {/* <Route path="/boss" component={Boss}></Route> */}
                {/* <Route path="/genius" component={Genius}></Route> */}
            </div>
        )
    }
}

export default Dashboardl;