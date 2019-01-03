import {combineReducers} from 'redux'
import {user} from './user'
import {chatuser} from './chatuser'
import {chat} from './chat'

export default combineReducers({
    user,
    chatuser,
    chat
})