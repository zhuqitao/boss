import React from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {styles} from './index.module.css';

@connect(
    state => state.chat
)
class NavLinkBar extends React.Component{
    constructor(){
        super();
        this.state={}
    }
    press = path => () => {
        this.props.history.push(path);
    }
    render() {
        const {pathname} = this.props.location;
        const navList = this.props.data.filter(v=>!v.hide);
        return (
            <TabBar>
                {navList.map(v=> (
                    <TabBar.Item
                        badge={v.path==='/msg'?this.props.unread:0}
                        title={v.text}
                        key={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={pathname === v.path}
                        onPress={this.press(v.path)}
                    >

                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default withRouter(NavLinkBar);