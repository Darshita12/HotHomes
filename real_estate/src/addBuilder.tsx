import React from "react";
import '../src/CSS/addProperty.css'
import { AddBuilderState } from "./models/property.model";
import { UserService } from "./services/user.service";
let valid: boolean = true;
class AddBuilder extends React.Component<any, AddBuilderState>{
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: ''
        }
    }
    handleSubmit = (e: any) => {
        // Check that Property Type and Building Type fields are selected
        e.preventDefault();
        console.log('jgycghb')
        if (!this.state.email || !this.state.password || !this.state.name) {
            valid = false;
        }
        console.log(valid);
        if (valid) {
            const userService = new UserService();
            userService.userRegister(this.state.name,this.state.email, this.state.password, 'builder').then((response) => {
                // this.setState({ propertyList: response.data });
                console.log(response);
            })
                .catch((error) => {
                    console.error(`Failed to fetch property data: ${error.message}`);
                });
        }
        this.props.history.push('/');
    }
    render(): React.ReactNode {
        return (
            <div className="cards-main">
                <div className="formbold-form-wrapper">
                    <div className="formbold-mb-3">
                        <label htmlFor="price" className="formbold-form-label"> Name </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={this.state.name}
                            placeholder="Enter Name"
                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="price" className="formbold-form-label"> Email </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={this.state.email}
                            placeholder="Enter Email"
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="price" className="formbold-form-label"> Password </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            placeholder="Enter Password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                            className="formbold-form-input"
                        />
                    </div>
                    {!valid &&
                        <div style={{ color: "red" }}> Please fill the required fields.</div>
                    }
                    <button className="formbold-btn" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}
export default AddBuilder;