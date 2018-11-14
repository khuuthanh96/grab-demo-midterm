import React from "react";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit() {
        axios.post("http://localhost:8000/auth/login", {email: this.state.email, password: this.state.password})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <label htmlFor="email">Tên đăng nhập: </label> 
                <input name="email" id="email" type="email" value={email} onChange={this.handleChange}/><br/>
                <label htmlFor="password">Mật khẩu: </label>
                <input name="password" id="password" type="password" value={password} onChange={this.handleChange}/><br/>

                <button onClick={this.handleSubmit}>Đăng nhập</button>
            </div>
        )
    }
};

export default Login;