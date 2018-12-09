import React from 'react';
import styles from "./index.module.css";
import {Button} from 'antd-mobile';
import axios from 'axios';
class Login extends React.Component {

    componentDidMount() {
        axios.get('/api/user/info');
    }
    render() {
        return (
            <div className={styles.login}>
                login
                <Button type="primary">button</Button>
            </div>
        )
    }
};

export default Login