import {combineReducers} from 'redux';
import {ADD_NUM, SET_USER} from './action';
const initState = {
	num: 0,
	user: {
		name: '张三',
		age: 18
	}
}

// function addNum(state = initState, action) {
// 	switch(action.type) {
// 		case ADD_NUM:
// 			const {num} = state;
// 			return {
// 				...state,
// 				num: num++
// 			};
// 		case SET_USER:
// 			const {data} = action;
// 			return {
// 				...state,
// 				user: data
// 			};
// 		default:
// 			return state;
// 	}
// }
function addNum(state = 0, action) {
	switch(action.type) {
		case ADD_NUM:
			const {num} = state;
			return state++;
		default:
			return state;
	}
}
function setUser(state = {
	name: '张三',
	age: 18
}, action) {
	switch (action.type) {
		case SET_USER:
			const {data} = action;
			return {
				...state,
				...data
			}
		default:
			return state
	}
}
export default combineReducers({addNum, setUser});



