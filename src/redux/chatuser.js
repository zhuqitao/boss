import axios from 'axios';
const USER_LILST = 'user_list';
const initState={
    userlist: []
}
export function chatuser(state=initState, action){
    switch(action.type) {
        case USER_LILST:
            return {
                ...state,
                userlist: action.payload
            }
        default:
            return state;
    }
}
function userList(data) {
    return {
        type: USER_LILST,
        payload: data
    }
}

export function getUserList(type) {
    return dispatch=>{
        axios.get(`/api/user/list?type=${type}`).then(res=> {
            if(res.data.code === 0) {
                dispatch(userList(res.data.data))
            }
        })
    }
}