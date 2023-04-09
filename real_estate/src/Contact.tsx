import React from 'react';
// import '../src/CSS/about.css';
// import '../src/CSS/home.css';
import '../src/CSS/bootstrap.min.css'
import { UserService } from './services/user.service';
class Contact extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            valid: false
        }
    }
    handleContact = (e: any) => {
        e.preventDefault();
        if (!this.state.email || !this.state.name || !this.state.subject || !this.state.message) {
            alert('Please enter all the details.');
            return;
        }
        const userService = new UserService();
        console.log(this.state.email)
        userService.contact(this.state.name, this.state.email, this.state.subject, this.state.message).then((response) => {
            // this.setState({ propertyList: response.data });
            console.log(response);
            if (response.message) {
                this.setState({ valid: true })
            }
            alert("Submitted!");
            this.props.history.push('/');
        })
            .catch((error) => {
                console.error(`Failed to fetch`);
            }
            )
    }
    render() {
        return (
            <div className="cards-main">
                <div className="container-xx6 pb-5">
                    <div className="container1">
                        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ width: "400px,height:800px" }}></div>

                        <h1 className="row mb-6"><b>Contact Us</b></h1>
                        <p>This is a Hot Home real estate portal as this portal developed for buyer and sellers.Through this portal buyers can easily make contact with property owners</p></div>

                    <div className="row g-4">
                        <div className="col-12">
                            <div className="row gy-4">
                                <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">

                                    <div className="bg-light rounded p-3">
                                        <div className="d-flex align-items-center bg-white rounded p-3" style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}>
                                            <div className="icon me-3" style={{ width: "45px", height: "45px" }}>
                                                <i className="fa fa-map-marker-alt text-primary"></i>
                                            </div>
                                            <span>4000 victoria park,North York,Toronto</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                                    <div className="bg-light rounded p-3">
                                        <div className="d-flex align-items-center bg-white rounded p-3" style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}>
                                            <div className="icon me-3" style={{ width: "60px", height: "45px" }}>
                                                <i className="fa fa-envelope-open text-primary"></i>
                                            </div>
                                            <span>Loyalistcollege@tbc.com</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                                    <div className="bg-light rounded p-3">
                                        <div className="d-flex align-items-center bg-white rounded p-3" style={{ border: "1px dashed rgba(0, 185, 142, .3)" }}>
                                            <div className="icon me-3" style={{ width: "45px", height: "45px" }}>
                                                <i className="fa fa-phone-alt text-primary"></i>
                                            </div>
                                            <span>+012 345 6789</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <iframe className="position-relative rounded w-100 h-100"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                                style={{ height: "400px", border: "0" }} aria-hidden="false">
                            </iframe>
                        </div>
                        <div className="col-md-6 contact">
                            <div className="" data-wow-delay="0.5s">
                                <p className="mb-4">The contact form help clients to fill their details and emails as well as they can give message regarding their choice</p>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            {/* <div className="form-floating"> */}
                                            <label>Your Name</label>
                                            <input type="text" className="form-control form-input" id="name" placeholder='Enter Name' onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                            {/* <label htmlFor="name">Your Name</label> */}
                                            {/* </div> */}
                                        </div>
                                        <div className="col-md-6">
                                            {/* <div className="form-floating"> */}
                                            <label htmlFor="email">Your Email</label>
                                            <input type="text" id="email" className="form-control form-input" placeholder="Enter Email" onChange={(e) => { this.setState({ email: e.target.value }) }}></input>
                                            {/* </div> */}
                                        </div>
                                        <div className="col-12">
                                            {/* <div className="form-floating"> */}
                                            <label htmlFor="subject">Subject</label>
                                            <input type="text" className="form-control form-input" id="subject" placeholder="Subject" onChange={(e) => { this.setState({ subject: e.target.value }) }}></input>
                                            {/* </div> */}
                                        </div>
                                        <div className="col-12">
                                            {/* <div className="form-floating"> */}
                                            <label htmlFor="message">Message</label>
                                            <textarea className="form-control form-input" placeholder="Leave a message here" id="message" style={{ height: "50px" }} onChange={(e) => { this.setState({ message: e.target.value }) }}></textarea>
                                            {/* </div> */}
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit" onClick={this.handleContact}>Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div></div></div>

        )
    }
}

export default Contact;