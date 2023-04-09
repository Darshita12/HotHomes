import React from 'react';
import '../src/CSS/home.css';
import '../src/CSS/filter.css';
import '../src/CSS/bootstrap.min.css'
import { PropertyService } from './services/property.service';
import { Property, PropertyList } from '../src/models/property.model';
import { Link } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends React.Component<any, PropertyList>{
    constructor(props: any) {
        super(props);
        this.state = {
            propertyList: [],
            propertyId: 0,
            address: '',
            map: null,
            marker: null,
            filters: {
                bath: '',
                bed: '',
                minprice: 0,
                maxprice: 0,
                buildingType: '',
                cities: '',
                storey: '',
                propertyType: ''
            },
            savedProperties: [],
            filteredProperties: []

        }
        // this.handleSaveProperty = this.handleSaveProperty.bind(this);

    }
    componentDidMount(): void {

        const propertyService = new PropertyService();
        const proplist: Property[] = []
        propertyService.getProperty().then((response) => {
            response.data.map((property: any) => {


                if (localStorage.getItem('role') === 'user' || localStorage.getItem('role') == undefined) {
                    if (property.status != 'sold') {
                        console.log(property)
                        proplist.push(property)
                    }
                }
                else if (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'builder') {
                    proplist.push(property);
                }
            })
            this.setState({ propertyList: proplist, filteredProperties: proplist });

        })
            .catch((error) => {
                console.error(`Failed to fetch property data: ${error.message}`);
            });
        const ids: any = [];
        if (localStorage.getItem('role') === 'user') {
            const userid = localStorage.getItem('userid');
            if (userid) {
                propertyService.getSavedPropertyByUserId(userid).then((response) => {
                    console.log(response)
                    response.data.map((property: any) => {
                        console.log(property.propertyId);
                        ids.push(property.propertyId);
                    })
                    this.setState({ savedProperties: ids });
                }).catch((error) => {
                    console.error(`Failed to fetch property data: ${error.message}`);
                });
            }
        }

    }
    handleFilter = () => {
        const { filters, propertyList } = this.state;
        let filteredList = propertyList;

        // Apply bed filter
        if (filters.cities && filters.cities !== 'All Cities') {
            debugger
            console.log(filters.cities)
            filteredList = filteredList.filter(
                (property) => property.address.city === filters.cities
            );
        }
        // Apply bed filter
        if (filters.bed && filters.bed !== 'Bedrooms') {
            filteredList = filteredList.filter(
                (property) => parseInt(property.bed.toString()) === parseInt(filters.bed.toString())
            );
        }

        // Apply bath filter
        if (filters.bath) {
            filteredList = filteredList.filter(
                (property) => property.bath === parseInt(filters.bath)
            );
        }

        // Apply storey filter
        if (filters.storey) {
            filteredList = filteredList.filter(
                (property) => parseInt(property.storey.toString()) === parseInt(filters.storey)
            );
        }

        // Apply property type filter
        if (filters.propertyType && filters.propertyType !== 'Property Type') {
            filteredList = filteredList.filter(
                (property) => property.proptype === filters.propertyType
            );
        }
        // Apply property type filter
        if (filters.buildingType && filters.buildingType != 'Building Type') {
            filteredList = filteredList.filter(
                (property) => property.buildingtype === filters.buildingType
            );
        }
        // Apply min price filter
        console.log(filters.minprice)
        if (filters.minprice) {
            console.log(filters.minprice)
            filteredList = filteredList.filter(
                (property) => parseInt(property.price.toString()) >= parseInt(filters.minprice.toString())
            );
        }

        // Apply max price filter
        if (filters.maxprice) {
            filteredList = filteredList.filter(
                (property) => parseInt(property.price.toString()) <= parseInt(filters.maxprice.toString())
            );
        }
        console.log(filteredList)
        this.setState({ filteredProperties: filteredList });
    }
    handleClick = (id: Number) => {
        console.log(id);
        this.setState({ propertyId: id });
    }
    handleChange = (event: any) => {
        const { id, value } = event.target;
        let parsedValue = value;
        if (id === 'bath' || id === 'storey' || id === 'maxprice') {
            parsedValue = parseInt(value);
        }
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [id]: parsedValue
            }
        }), this.handleFilter);

    }

    handleSaveProperty = (id: any) => {
        const role = localStorage.getItem('role');
        const userid = localStorage.getItem('userid');
        if (role === 'user' || role === 'admin' || role === 'builder') {
            this.setState({ savedProperties: [...this.state.savedProperties, id] })

            const propertyService = new PropertyService();
            if (userid) {
                propertyService.saveProperty(userid, id).then((response) => {
                    // this.setState({ propertyList: response.data });
                    console.log(response);
                })
                    .catch((error) => {
                        console.error(`Failed to fetch property data: ${error.message}`);
                    });
            }


        } else {
            this.props.history.push('/login');
        }
    }


    handleRemoveProperty = (id: any) => {
        if (localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'builder') {
            this.setState(prevState => ({
                savedProperties: prevState.savedProperties.filter(item => item !== id)
            }));
            const propertyService = new PropertyService();
            propertyService.deleteSavedProperty(id).then((response) => {
                // this.setState({ propertyList: response.data });
                console.log(response);
            })
                .catch((error) => {
                    console.error(`Failed to fetch property data: ${error.message}`);
                });
        }
        else {
            this.props.history.push('/login');

        }
    }
    handleStatus = (event: any, id: any) => {
        event.preventDefault();
        const propertyService = new PropertyService();

        propertyService.chnagePropertyStatus(id.toString(), 'sold').then((response) => {
            console.log(response);
            if (response.data.status == 'sold') {
                propertyService.getProperty().then((response) => {
                    console.log('kiknjn')
                    this.setState({ propertyList: response.data });
                })
                    .catch((error) => {
                        console.error(`Failed to fetch property data: ${error.message}`);
                    });
            }

        })
            .catch((error) => {
                console.error(`Failed to fetch property data: ${error.message}`);
            });

    };
    render() {
        const { propertyList, propertyId, filteredProperties } = this.state;
        return (
            <div className='cards-main'>

                {/* <form action="#" method="post" id="advanceSearch"> */}
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="form-group">
                            <select className="form-control1" id="cities" onChange={this.handleChange}>
                                <option>All Cities</option>
                                <option>Scarborough</option>
                                <option>Brampton</option>
                                <option>Missisauga</option>
                                <option>Vancouver</option>
                                <option>Toronto</option>
                                <option>Calgary</option>
                                <option>Adelaide</option>
                                <option>Perth</option>
                                <option>Auckland</option>
                                <option>Helsinki</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="form-group">
                            <select className="form-control1" id="propertyType" onChange={this.handleChange}>
                                <option>Property Type</option>
                                <option>Residential </option>
                                <option>Commercial </option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="form-group">
                            <select className="form-control1" id="buildingType" onChange={this.handleChange}>
                                <option>Building Type</option>
                                <option>Apartment</option>
                                <option>Bar</option>
                                <option>Farm</option>
                                <option>House</option>
                                <option>Store</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="form-group">
                            <select className="form-control1" id="storey" onChange={this.handleChange}>
                                <option>Storeys</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-xl-2">
                        <div className="form-group">
                            <select className="form-control1" id="bed" onChange={this.handleChange}>
                                <option>Bedrooms</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-xl-2">
                        <div className="form-group">
                            <select className="form-control1" id="bath" onChange={this.handleChange}>
                                <option>Bathrooms</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-xl-2">
                        <div className="form-group">
                            {/* <select className="form-control1" id="minprice" onChange={this.handleChange}>
                                <option>Min price</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </select> */}
                            <input type="number" className="formbold-form-input"
                                name='minprice' id='minprice' style={{ height: "40px" }} value={this.state.filters.minprice} placeholder="Enter Minimum price" onChange={this.handleChange} />

                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-xl-2">
                        <div className="form-group">
                            {/* <select className="form-control1" id="maxprice" onChange={this.handleChange}>
                                <option>Max price</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </select> */}
                            <input
                                type="number"
                                name="maxprice"
                                id="maxprice"
                                style={{ height: "40px" }}
                                value={this.state.filters.maxprice}
                                onChange={this.handleChange}
                                placeholder="Enter Maximum price"
                                className="formbold-form-input"
                            />
                        </div>
                    </div>
                    {/* <div className="col-12 col-md-4 col-lg-3">
                        <div className="form-group">
                            <select className="form-control1" id="catagories" onChange={this.handleChange}>
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Sold out</option>
                            </select>
                        </div>
                    </div> */}
                    {/* <div className="col-12 col-md-4 col-lg-3">

                        <button className='filter-button' onClick={handleFilter}>
                            <span> FILTERS </span>
                        </button> </div> */}
                </div>
                {/* </form> */}

                <div className="row g-4">

                    {propertyId == 0 &&
                        filteredProperties.map(property => (
                            <div className="col-lg-4 col-md-6 wow fadeInUp cards" data-wow-delay="0.1s">
                                <div className="property-item rounded overflow-hidden">
                                    <Link to={`/property/${property._id}`}>

                                        <div className="position-relative overflow-hidden">
                                            {property.images && property.images.length > 0 &&
                                                <img className="img-fluid" src={require(`../src/img/${property.images[0].toString()}`)} alt="" />
                                                // <img className="img-fluid" src={require("../src/img/property-1.jpg")} alt="" />


                                            }
                                            {/* <img className="img-fluid" src={require("../src/img/property-1.jpg")} alt="" /> */}
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{property.proptype}</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.buildingtype}</div>
                                        </div>
                                    </Link>

                                    <div className="p-4 pb-0">
                                        <div className='row'>
                                            <h5 className="col-md-6 text-primary mb-3">{parseInt(property.price.toString()).toLocaleString()}</h5>

                                            <div className='col-md-6'>

                                                {
                                                    localStorage.getItem('role') !== 'builder' && localStorage.getItem('role') !== 'admin' ? (
                                                        <div>
                                                            {this.state.savedProperties.includes(property._id) ? (
                                                                <span className="float-right" onClick={() => this.handleRemoveProperty(property._id)}>
                                                                    <FontAwesomeIcon icon={faSolidHeart} size="2x" />
                                                                </span>

                                                            ) : (
                                                                <span className="float-right text-danger" onClick={() => this.handleSaveProperty(property._id)}>
                                                                    <FontAwesomeIcon icon={faHeart} size="2x" />
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : null

                                                }
                                                {localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'builder' ? (
                                                    <div>
                                                        {property.status === 'sold' ? (
                                                            <img style={{ width: '52px', height: '52px', float: 'right' }} src={require('../src/img/sold.png')} />

                                                        ) :
                                                            <button className='home-sold-button' onClick={(e) => { this.handleStatus(e, property._id) }}>
                                                                <span> Sold? </span>
                                                            </button>
                                                        }
                                                    </div>
                                                ) : null}
                                                {/* {localStorage.getItem('role') === 'builder' || localStorage.getItem('role') === 'admin' ? (
                                                    <img style={{ width: 'inherit', float: 'right' }} src={require('../src/img/sold.png')} />
                                                ) : null

                                                } */}
                                                {/* <span className='float-right text-danger' onClick={this.handleSaveProperty}><FontAwesomeIcon icon={faHeart} size="2x" />
                                                </span> */}
                                            </div>
                                        </div>
                                        {/* <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a> */}
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
                </div>
            </div>
        )
    }
}

export default Home;