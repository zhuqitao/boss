import React from 'react';
import styles from "./index.module.css";
import {Button} from 'antd-mobile';
import formCreate from './formCreate';
@formCreate
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            test: {}
        }
    }
    componentDidMount() {
        
    }
    click(key) {
        return e => {
            console.log('key', key);
            console.dir(e.target);
        }
    }
    render() {
        return (
            <div className={styles.login}>
                login
                <Button type="primary">button</Button>
                <div data-id="1" onClick={this.click('div')}>div</div>
            </div>
        )
    }
};

export default Login