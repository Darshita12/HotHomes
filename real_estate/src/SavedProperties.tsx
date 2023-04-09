import React from "react";
import { Link } from "react-router-dom";
import { Property, SavedPropertyState } from "./models/property.model";
import { PropertyService } from "./services/property.service";
import propert from '../src/img/property-1.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import jwt_decode from 'jwt-decode';

let filteredProperties: Property[] = []
class SavedProperties extends React.Component<any, SavedPropertyState>{
    constructor(props: any) {
        super(props);
        this.state = {
            savedProperties: [],
            propertyids: []
        }
    }
    async componentDidMount() {
        let userid = "";
        let token = localStorage.getItem('token');
        let decodedToken: any;
        if (token) {
            decodedToken = jwt_decode(token);
            console.log(decodedToken);
            userid = decodedToken.id;
        }
        const propertyService = new PropertyService();
        const ids: Number[] = [];
        await propertyService.getSavedPropertyByUserId(userid).then((response) => {
            console.log(response)
            response.data.map((property: any) => {
                console.log(property.propertyId);
                ids.push(property.propertyId);
            })
            this.setState({ propertyids: ids });
        }).catch((error) => {
            console.error(`Failed to fetch property data: ${error.message}`);
        });
        await propertyService.getProperty().then((response) => {
            this.setState({ savedProperties: response.data });
        }).catch((error) => {
            console.error(`Failed to fetch property data: ${error.message}`);
        });
        console.log(this.state.savedProperties);
        filteredProperties = this.state.savedProperties.filter(property => this.state.propertyids.includes(property._id));

    }
    render() {
        console.log(filteredProperties)
        return (
            <div className="cards-main">
                <div className="row g-4">

                    {filteredProperties &&
                        filteredProperties.map(property => (
                            <div className="col-lg-4 col-md-6 wow fadeInUp cards" data-wow-delay="0.1s">
                                <div className="property-item rounded overflow-hidden">
                                    <Link to={`/property/${property._id}`}>

                                        <div className="position-relative overflow-hidden">
                                        {property.images && property.images.length > 0 &&
                                                <img className="img-fluid" src={require(`../src/img/${property.images[0].toString()}`)} alt="" />
                                                // <img className="img-fluid" src={require("../src/img/property-1.jpg")} alt="" />


                                            }
                                            {/* <img className="img-fluid" src={propert} alt="" /> */}
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.buildingtype}</div>
                                        </div>
                                    </Link>

                                    <div className="p-4 pb-0">
                                        <div className='row'>
                                            <h5 className="col-md-6 text-primary mb-3">{property.price}</h5>
                                            <div className='col-md-6'><span className='float-right text-danger'><FontAwesomeIcon icon={faHeart} size="2x" /></span>
                                            </div>
                                        </div>
                                        <p><i className="fa fa-map-marker-alt text-primary me-2"></i> {property.address.streetname}, {property.address.city}, {property.address.province}</p>
                                    </div>
                                    <div className="d-flex border-top">
                                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>{property.area} Sqft</small>
                                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>{property.bed.toString()} Bed</small>
                                        <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>{property.bath.toString()} Bath</small>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {filteredProperties.length === 0 &&
                        <div>
                            No saved Properties found.
                        </div>

                    }
                </div>

            </div>
        )
    }
}

export default SavedProperties;