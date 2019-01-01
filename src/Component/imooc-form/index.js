import React from 'react';
export default function imoocForm(Comp) {
    return class WrapperComp extends React.Component{
        constructor(props) {
            super(props);
            this.state={

            }
        }
        handleChange = key => value => {
            console.log(key, value);
            this.setState({
                [key]: value
            })
        }
        render() {
            const {state} = this;
            return <Comp 
                    handleChange={this.handleChange}
                    state={state}
                    {...this.props}
                />
        }
    }

}