import React from 'react';
import {List, InputItem, NavBar, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat'
import {getChatId} from '../../util'
// import io from 'socket.io-client';
// const socket = io('ws://localhost:8888');
import './index.css'
@connect(
    state=>state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        })
        
    }

    inputChange = value => {
        this.setState({
            text: value
        })
    }
    handleSubmit = () => {
        // socket.emit('sendmsg', {text: this.state.text});
        // this.setState({
        //     text: ''
        // })
        const from = this.props.user._id;
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg});
        this.setState({
            text: ''
        })
    }
    
    render() {

        const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋'.split(' ').filter(v=>v).map(v=>({text: v}))
         
        



        const userid = this.props.match.params.user
        const Item = List.Item;
        const users = this.props.chat.users
        const chatid = getChatId(userid, this.props.user._id);
        const chatmsg = this.props.chat.chatmsg.filter(v=> {
            return v.chatid === chatid
        });
        

        if(!users[userid]) {
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar mode='dark'>
                    {users[userid].name}
                </NavBar>
                {chatmsg.map(v=> {
                    return v.from === userid
                        ?(
                            <List key={v._id}>
                                <Item>{v.content}</Item>
                            </List>
                        )
                        :(
                            <List key={v._id}>
                                <Item className="chat-me">{v.content}</Item>
                            </List>
                        )
                })}
                <List className="">
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={this.inputChange}
                        extra={<span onClick={this.handleSubmit}>发送</span>}
                    >信息</InputItem>
                </List>
                <Grid 
                    data={emoji}
                    columnNum={9}
                    carouselMaxRow={3}
                    isCarousel={true}
                />
            </div>
        )
    }
}
export default Chat;