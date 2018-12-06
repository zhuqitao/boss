export const ADD_NUM = 'ADD_NUM';
export const SET_USER = 'SET_USER';

export function addNum(payload) {
	return {
		type: ADD_NUM,
		payload
	}
}

export function serUser(payload) {
	return {
		type: SET_USER,
		payload
	}
}