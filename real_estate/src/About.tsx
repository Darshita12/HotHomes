import React from 'react';
import '../src/CSS/about.css';
import '../src/CSS/bootstrap.min.css'
import propert from '../src/img/about1.jpg';
import propert2 from '../src/img/property-2.jpg';
import propert3 from '../src/img/property-3.jpg';
import propert4 from '../src/img/property-4.jpg';
import propert5 from '../src/img/property-5.jpg';
import propert6 from '../src/img/property-6.jpg';
class About extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className='cards-main'>
                <section className="ftco-section ftco-no-pb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 img img-3 d-flex justify-content-center align-items-center">
                                <img src={propert} style={{ width: "80vh" }} />
                            </div>
                            <div className="col-md-6 wrap-about pl-md-5 ftco-animate">
                                <div className="heading-section">
                                    <h2 className="mb-4">Welcome To Hot Homes Real Estate </h2>

                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                    <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.</p>
                                    <p><a href="#" className="btn btn-primary">Find Properties</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="ftco-section" style={{marginTop: "40px", padding: "20px"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: 600, fontSize: "20px" }}>Our Mission</h3>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                            </div>
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: 600, fontSize: "20px" }}>Our Vission</h3>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                            </div>
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: 600, fontSize: "20px" }}>Our Value</h3>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="ftco-counter ftco-section ftco-no-pt ftco-no-pb img" id="section-counter">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
                                <div className="block-18 py-4 mb-4">
                                    <div className="text text-border d-flex align-items-center">
                                        <strong className="number" data-number="305">0</strong>
                                        <span>Area <br />Population</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
                                <div className="block-18 py-4 mb-4">
                                    <div className="text text-border d-flex align-items-center">
                                        <strong className="number" data-number="1090">0</strong>
                                        <span>Total <br />Properties</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
                                <div className="block-18 py-4 mb-4">
                                    <div className="text text-border d-flex align-items-center">
                                        <strong className="number" data-number="209">0</strong>
                                        <span>Average <br />House</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
                                <div className="block-18 py-4 mb-4">
                                    <div className="text d-flex align-items-center">
                                        <strong className="number" data-number="67">0</strong>
                                        <span>Total <br />Branches</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
        )
    }
}

export default About;