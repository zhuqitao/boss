import axios from 'axios';
const REGISTRT_SUCCESS = 'REGISTRT_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
	isAuth: '',
	msg: '',
	user: '',
	pwd: '',
	type: ''
};
// reducer
export function user(state = initState, action) {
	switch(action.type) {
		case REGISTRT_SUCCESS:
			return {
				...state, 
				msg: '',
				isAuth: true,
				...action.payload
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
function registerSuccess(data) {
	return {
		type: REGISTRT_SUCCESS,
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
		axios.post('/user/register', {
			user, pwd, type
		}).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				dispatch(registerSuccess({user, pwd, type}));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		})
	}
	
}