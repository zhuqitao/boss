import React from 'react';
// 属性代理 高阶组件
// const createForm = WrappedComponent => class extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             field: {}
//         }
//     }
    
//     onChange = key => e => {
//         const {field} = this.state;
//         field[key] = e.target.value;
//         console.log(key);
//         console.log(e);
//         this.setState({
//             field
//         })
//     }
//     handleSubmit = () => {
//         console.log(this.state.field);
//     }
//     getField = fieldNamee => {
//         return {
//             onChange: this.onChange(fieldNamee)
//         }
//     }
    
//     render() {
//         const props = {
//             getField: this.getField,
//             handleSubmit: this.handleSubmit,
//             ...this.props,
//         }
//         return (<WrappedComponent {...props} />)
//     }
// };

// 反向继承 高阶组件
const createForm = WrappedComponent => class extends WrappedComponent{
    constructor(){
        super();
        this.state = {
        }
    }
    
    render() {
        return (<div>aaa</div>)
    }
};
export default createForm;