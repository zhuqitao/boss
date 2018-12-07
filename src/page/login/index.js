import React from 'react';
import styles from "./index.module.css";
import {Button} from 'antd-mobile';
class Login extends React.Component {

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