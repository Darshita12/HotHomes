import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { Styles } from './styles';
import React, { RefObject } from 'react';

interface NavbarProps {

}
let token: any;
class NavBar extends React.Component<NavbarProps, any>{
    constructor(props: any) {
        super(props);
    }
    // private map: google.maps.Map | null = null;
    // private searchInput: RefObject<HTMLInputElement> = React.createRef();
    // private addressInput: RefObject<HTMLInputElement> = React.createRef();

    // componentDidMount() {
    //     const script = document.createElement('script');
    //     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    //     script.onload = () => {
    //         const mapInstance = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
    //             center: { lat: 37.7749, lng: -122.4194 },
    //             zoom: 12,
    //         });
    //         this.map = mapInstance;
    //     };
    //     document.head.appendChild(script);
    // }

    // componentWillUnmount() {
    //     const script = document.querySelector(`[src="https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"]`);
    //     if (script) {
    //         document.head.removeChild(script);
    //     }
    // }
    // handleAddress = () => {
    //     console.log('hdjb')
    //     // if (!this.map || !this.addressInput.current) return;
    //     console.log('hdjb')
    //     const geocoder = new window.google.maps.Geocoder();
    //     console.log(this.addressInput.current);
    //     if (this.addressInput.current) {
    //         geocoder.geocode({ address: this.addressInput.current.value }, (results, status) => {
    //             if (status === 'OK') {
    //                 const location = results[0].geometry.location;
    //                 if (this.map) {
    //                     this.map.setCenter(location);
    //                     new window.google.maps.Marker({
    //                         position: location,
    //                         map: this.map,
    //                     });
    //                 }

    //             } else {
    //                 alert(`Geocode was not successful for the following reason: ${status}`);
    //             }
    //         });
    //     }
    // };
    render() {
        const logo = require("../src/assets/logo.png");
        return (
            <Styles>
                <Navbar expand="lg">
                    <Navbar.Brand href="/"><img src={logo} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Form className="form-center">
                        <FormControl type="text" placeholder="Search" className="" />
                        {/* <input type="text" placeholder="Address" ref={this.addressInput} />
                        <button type='button' onClick={this.handleAddress}>Go</button> */}
                    </Form>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
                            {!localStorage.getItem('userid') &&
                                <Nav.Item><Nav.Link href="/login">Login/Register</Nav.Link></Nav.Item>
                            }
                            {/* <Nav.Item><Nav.Link href="/details">Details</Nav.Link></Nav.Item> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    }
}
export default NavBar;