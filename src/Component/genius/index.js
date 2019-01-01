import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser'
import UserCard from '../usercard';
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Genius extends React.Component{
    
    componentDidMount() {
        this.props.getUserList('boss');
    }
    render() {
        console.log(this.props)
        const {userlist} = this.props;
        return(
            <UserCard data={userlist}></UserCard>
        )
    }
}

export default Genius;