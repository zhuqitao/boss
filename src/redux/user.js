import axios from 'axios';
import {getRedirectPath} from '../util';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';
const initState = {
	redirectTo: '',
	msg: '',
	user: '',
	type: ''
};
// reducer
export function user(state = initState, action) {
	switch(action.type) {
		case AUTH_SUCCESS:
			return {
				...state, 
				redirectTo: getRedirectPath(action.payload, action.payload.avatar||false),
                ...action.payload,
                msg: '',
			}
		case  LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {
                ...initState,
                redirectTo: '/login'
            }
		case ERROR_MSG:
			return {
				...state,
				isAuth: false,
				msg: action.msg
			};
		default:
			return state;
	}
}

function errorMsg(msg) {
	return {
		msg,
		type: ERROR_MSG
	}
}

function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}

export function register({user, pwd, repeatPwd, type}) {
	if(!user || !pwd || !type) {
		return errorMsg('用户名密码必须输入');
	}
	if(pwd !==  repeatPwd) {
		errorMsg('密码和确认密码不同');
	}
	return dispatch => {
		axios.post('/api/user/register', {
			user, pwd, type
		}).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess({user, pwd, type}));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		})
	}
}
export function loadData(userInfo) {
	return {type: LOAD_DATA, payload: userInfo};
}
export function userInfo() {
	return dispatch => {
		axios.get('/api/user/info').then(res => {
            if(res.data.code === 0) {

            }else {
				const {history, loadData} = this.props;
				history.push('/login');
				loadData(res.data);
            }
        })
	}
}
export function login({user, pwd}) {
	if (!user || !pwd) {
		return errorMsg('用户密码必须输入');
	}
	return dispatch => {
		axios.post('/api/user/login', {user, pwd}).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		})
	}
}

export function update(data) {
    return dispatch => {
        axios.post('/api/user/update', data).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                const param = Object.assign({}, res.data.data, {
                    avatar: true
                })
				dispatch(authSuccess(param));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
        })
    }
}

export function logoutSubmit() {
    return {
        type: LOGOUT
    }
}