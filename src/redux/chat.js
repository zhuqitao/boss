import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:8888');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';


const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat(state=initState, action) {
    switch(action.type){
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v=>{
                    return (!v.read)&&(v.to===action.payload.userid)
                    
                }).length,
                users: action.payload.users
            }
        case MSG_RECV:
            const n = action.payload.to === action.userid? 1: 0
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
                unread: state.unread+n
            }
        // case MSG_RECV:
        case MSG_READ:
            const {from, num} = action.payload;
            return {
                ...state,
                chatmsg: state.chatmsg.map(v=>{
                    if(from === v.from) {
                        v.read = true;
                    }
                    return v;
                }),
                unread: state.unread - num
            }
        default:
            return state
    }
}

function msgList(msgs, users, userid) {
    return {
        type: MSG_LIST,
        payload: {msgs, users, userid}
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        console.log(getState())
        axios.get('/api/user/getmsglist').then(res  => {
            if(res.status === 200 && res.data.code === 0){
                const userid = getState().user._id;
                dispatch(msgList(res.data.msgs, res.data.users, userid))
            }
        })
    }
}
function msgRead({from, userid, num}) {
    return {
        type: MSG_READ,
        payload: {from, userid, num}
    };
}
export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/api/user/readmsg', {from}).then(res=> {
            const userid = getState().user._id;
            if(res.status===200 && res.data.code===0){
                dispatch(msgRead({userid, from, num:res.data.num}))
            }
        })
    }
}

function msgRecv(msg, userid) {
    return {
        userid,
        type: MSG_RECV,
        payload: msg
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        const userid = getState().user._id;
        socket.on('recvmsg', data => {
            dispatch(msgRecv(data, userid))
        })
    }
}


export function sendMsg({from, to, msg}){
    return dispatch=>{
        socket.emit('sendmsg', {from, to, msg})
    }
}