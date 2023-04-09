import React from 'react';
import '../src/CSS/login.css';
import './App.css';
import { UserService } from './services/user.service';
import jwt_decode from 'jwt-decode';
class Login extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            role: '',
            emailRegister: '',
            passwordRegister: '',
            valid: false
            // rememberMe:{name: 'rememberMe', value: false, required:'true', error:''}
        }
    };
    handleRegister = (e: any) => {
        e.preventDefault();
        const userService = new UserService();
        console.log(this.state)
        userService.userRegister(this.state.username, this.state.emailRegister, this.state.passwordRegister, 'user');
        alert("Registration Successfull!");
        this.props.history.push('/login');
        this.setState({ email: '', password: '', username:''})

    }
    handleLogin = (e: any) => {
        e.preventDefault();
        if (!this.state.email) {
            alert('Please enter your email address.');
            return;
        }

        if (!this.state.password) {
            alert('Please enter your password.');
            return;
        }
        if (!this.state.role) {
            alert('Please select role type.');
            return;
        }
        const userService = new UserService();
        console.log(this.state.email)
        userService.userLogin(this.state.email, this.state.password, this.state.role).then((response) => {
            // this.setState({ propertyList: response.data });
            console.log(response);
            if (response.message) {
                this.setState({valid: true})
            }
            localStorage.setItem('token', response.token);
            let token = localStorage.getItem('token');
            let decodedToken: any;
            if (token) {
                decodedToken = jwt_decode(token);
                console.log(decodedToken);
                localStorage.setItem('userid', decodedToken.id);
                localStorage.setItem('role', decodedToken.role);
                this.props.history.push('/');

            }


        })
            .catch((error) => {
                console.error(`Failed to fetch`);
            }
            )

    }

    render() {
        const { email, password, username, emailRegister, passwordRegister } = this.state;
        return (
            <div className='body'>
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    <div className="signup">
                        <form onSubmit={this.handleRegister}>
                            <label className="loginLabel" htmlFor="chk" aria-hidden="true">Sign up</label>
                            <input type="text" name="username" value={username} placeholder="User name" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                            <input type="email" name="emailRegister" value={emailRegister} placeholder="Email" onChange={(e) => { this.setState({ emailRegister: e.target.value }) }} />
                            <input type="password" name='passwordRegister' value={passwordRegister} placeholder="Password" onChange={(e) => { this.setState({ passwordRegister: e.target.value }) }} />
                            <button>Sign up</button>
                        </form>
                    </div>

                    <div className="login">
                        <form onSubmit={this.handleLogin}>
                            <label className="loginLabel" htmlFor="chk" aria-hidden="true">Login</label>
                            <input type="email" name='email' value={email} placeholder="Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            <input type="password" name='password' value={password} placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            <select value={this.state.role.toString()} onChange={(e) => { this.setState({ role: e.target.value }) }} >
                                <option value="">Choose Type</option>
                                <option value="user">User</option>
                                <option value="builder">Builder</option>
                                <option value="admin">Admin</option>
                            </select>
                            {this.state.valid &&
                                <div style={{ color: "red", marginLeft:"80px" }}> Invalid Credentials.</div>
                            }
                            <button >Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;