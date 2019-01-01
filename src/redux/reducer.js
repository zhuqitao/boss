import {combineReducers} from 'redux'
import {user} from './user'
import {chatuser} from './chatuser'

export default combineReducers({
    user,
    chatuser
})