import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser'
import UserCard  from '../usercard'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    
    componentDidMount() {
        this.props.getUserList('genius');
    }
    render() {
        const {userlist} = this.props;
        return(
            <UserCard data={userlist}></UserCard>
        )
    }
}

export default Boss;