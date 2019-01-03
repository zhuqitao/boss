import React from 'react';
import {List, Badge} from 'antd-mobile';
import {connect} from 'react-redux';
import './index.css';
@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr) {
        return arr[arr.length-1]
    }
    render() {
        // if(!this.props.chat.chatmsg.length) {
        //     return null;
        // }
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return a_last - b_last
        })
        const {Item} = List;
        return (
            <div>
                <List>
                    {
                        chatList.map(v=> {
                            const lastItem = this.getLast(v);
                            const userid = this.props.user._id;
                            const targetId = v[0].from === userid?v[0].to:v[0].from
                            const unreadNum = v.filter(v=> {
                                
                                return (!v.read&&v.to===userid)
                            }).length
                            console.log(unreadNum);
                            return (
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    key={lastItem._id}
                                    arrow="horizontal"
                                    onClick={() => {this.props.history.push(`/chat/${targetId}`)}}
                                >   
                                    {lastItem.content}
                                    <p>{this.props.chat.users[targetId].name}</p>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}
export default Msg