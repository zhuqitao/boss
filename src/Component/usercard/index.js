import React from 'react';
import {Card, WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import './index.css'
class UserCard extends React.Component{
    handleClick = v => e => {
        console.log(v);
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        const {Header, Body} = Card;
        const {data} = this.props;
        return (
            <WingBlank>
                {data.map(v=> (
                    <Card
                        className="card"
                        key={v.title}
                        onClick={this.handleClick(v)}
                    >
                        <Header
                            title={v.user}
                            extra={<span>{v.title}</span>}
                        ></Header>  
                        <Body>
                            {v.desc} 
                        </Body>  
                    </Card>
                ))}
            </WingBlank>
        )
    }
}

export default withRouter(UserCard);