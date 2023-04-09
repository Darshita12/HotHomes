import React from 'react';
import '../src/CSS/home.css';
import '../src/CSS/table.css';
import '../src/CSS/calculator.css';
import propert from '../src/img/property-1.jpg';
import Chart from 'chart.js/auto';
import { PropertyDetailProps, PropertyDetailState } from './models/property.model';
import { PropertyService } from './services/property.service';
import { RouteComponentProps } from 'react-router-dom';

let myChart: any;
let userid = localStorage.getItem('userid');

class PropertyDetail extends React.Component<RouteComponentProps<PropertyDetailProps>, PropertyDetailState>{
    constructor(props: RouteComponentProps<PropertyDetailProps>) {
        super(props);
        this.state = {
            propertyDetail: {
                _id: parseInt(props.match.params.id),
                address: {
                    city: "",
                    province: "",
                    streetname: "",
                    pincode: ''
                },
                area: "",
                basement: "",
                bath: 0,
                bed: 0,
                builtin: 0,
                cooling: "",
                description: "",
                garage: "",
                heating: "",
                parking: 0,
                price: "",
                storey: "",
                buildingtype: "",
                proptype: "",
                water: "",
                images: [],
                status: ""

            },
            emi: {
                totalEmi: 0,
                interestRate: 0,
                loanAmount: 0,
                loanTerm: 0,
                totalAmount: 0,
                totalInterest: 0,
                displayChart: false
            },
            files: [],
            uploadedFiles: [],
            uploadedFilesByPropertyId: [],
            file: false
        }
    }

    componentDidMount(): void {
        const propertyService = new PropertyService();
        // console.log(this.props.match.params.id);
        // let token = localStorage.getItem('token');
        // let decodedToken: any;
        // if (token) {
        //     decodedToken = jwt_decode(token);
        //     console.log(decodedToken);
        //     userid = decodedToken.id;
        // }
        propertyService.getPropertyById(this.props.match.params.id).then((response) => {
            this.setState(
                {
                    emi: {
                        ...this.state.emi, loanAmount: parseInt(response.data.price.replace(/,/g, '')), interestRate: 4, loanTerm: 60

                    },
                    propertyDetail: {
                        _id: response.data._id,
                        address: {
                            city: response.data.address.city,
                            province: response.data.address.province,
                            streetname: response.data.address.streetname,
                            pincode: response.data.address.pincode
                        },
                        area: response.data.area,
                        basement: response.data.basement,
                        bath: response.data.bath,
                        bed: response.data.bed,
                        builtin: response.data.builtin,
                        cooling: response.data.cooling,
                        description: response.data.description,
                        garage: response.data.garage,
                        heating: response.data.heating,
                        parking: response.data.parking,
                        price: response.data.price,
                        storey: response.data.storey,
                        buildingtype: response.data.buildingtype,
                        proptype: response.data.proptype,
                        water: response.data.water,
                        images: response.data.images,
                        status: response.data.status
                    },

                }
            )
        })
            .catch((error) => {
                console.error(`Failed to fetch property data: ${error.message}`);
            });
        if (localStorage.getItem('role') == 'user' && userid) {
            propertyService.getDocumentsByPropertyIdAndUserID(userid, this.props.match.params.id).then((response) => {
                console.log(response)
                this.setState(
                    {
                        ...this.state,
                        uploadedFiles: response.data

                    }
                )

            })
                .catch((error) => {
                    console.error(`Failed to fetch property data: ${error.message}`);
                });
        }
        if (localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'builder') {
            propertyService.getAllDocumentsByPropertyId(this.props.match.params.id).then((response) => {
                console.log(response)
                this.setState(
                    {
                        ...this.state,
                        uploadedFilesByPropertyId: response.data

                    }
                )

            })
                .catch((error) => {
                    console.error(`Failed to fetch property data: ${error.message}`);
                });
        }


    }
    displayChart = () => {
        const canvas = document.getElementById("myChart") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (ctx !== null) {
            myChart = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ["Total Interest", "Principal Loan Amount"],
                    datasets: [
                        {
                            data: [this.state.emi.totalInterest, this.state.emi.loanAmount],
                            backgroundColor: ["#e63946", "#14213d"],
                            borderWidth: 0,
                        },
                    ],
                },
            });
            this.setState({ emi: { ...this.state.emi, displayChart: true } })
        }

    };
    updateChart = () => {
        myChart.data.datasets[0].data[0] = this.state.emi.totalInterest;
        myChart.data.datasets[0].data[1] = this.state.emi.loanAmount;
        myChart.update();
    };
    calculateEMI = async () => {

        const { emi } = this.state;
        if (emi.interestRate && emi.loanAmount && emi.loanTerm) {
            let interest = (emi.interestRate as number) / 12 / 100;
            let emi1: any =
                (emi.loanAmount as number) *
                interest *
                (Math.pow(1 + interest, emi.loanTerm as number) /
                    (Math.pow(1 + interest, emi.loanTerm as number) - 1));
            let totalAmount = Math.round((emi.loanTerm as number) * emi1);
            let totalInterest = Math.round(totalAmount - (emi.loanAmount as number));
            await new Promise<void>((resolve) => {
                this.setState({ emi: { ...emi, totalEmi: Math.round(emi1), totalAmount: totalAmount, totalInterest: totalInterest } }, () => {
                    resolve();
                });
            });

            if (this.state.emi.displayChart) {
                this.updateChart();
            } else {
                this.displayChart();

            }
        }


    };
    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            this.setState({ files });
        }
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        const { files } = this.state;
        if (files.length > 0) {
            const formData = new FormData();
            files.forEach((file) => formData.append('files', file));
            console.log(formData)
            console.log(files);
            if (userid) {
                const propertyService = new PropertyService();
                formData.append('propertyId', this.props.match.params.id);
                formData.append('userId', userid);
                if (localStorage.getItem('role') == 'user' && userid) {

                    propertyService.addDocumentsByPropertyIdUserId(formData).then((response) => {
                        console.log(response);
                        if (userid) {
                            propertyService.getDocumentsByPropertyIdAndUserID(userid, this.props.match.params.id).then((response) => {
                                console.log(response)
                                this.setState(
                                    {
                                        ...this.state,
                                        uploadedFiles: response.data

                                    }
                                )

                            })
                                .catch((error) => {
                                    console.error(`Failed to fetch property data: ${error.message}`);
                                });
                        }

                    })
                        .catch((error) => {
                            console.error(`Failed to fetch property data: ${error.message}`);
                        });
                }
            }


        }
    };
    getFile = () => {

        this.setState({ file: !this.state.file });

    }
    handleStatus = (event: any) => {
        event.preventDefault();
        const propertyService = new PropertyService();
        console.log(this.props.match.params.id)
        propertyService.chnagePropertyStatus(this.props.match.params.id, 'sold').then((response) => {
            console.log(response);
            this.setState({ ...this.state, propertyDetail: { ...this.state.propertyDetail, status: response.data.status } })
        })
            .catch((error) => {
                console.error(`Failed to fetch property data: ${error.message}`);
            });

    };
    handleLiveDemo = (e: any) => {
        window.open('https://teams.microsoft.com/l/meetup-join/19%3ameeting_M2E4OTJkOTgtOTJiNy00MTI2LTk5OWQtN2NjODkxZDNjODlk%40thread.v2/0?context=%7b%22Tid%22%3a%2270e69cff-a832-47bf-b167-3b8040e45d63%22%2c%22Oid%22%3a%22b3b4b3e3-b46f-48c7-86a6-80c833a5bee9%22%7d', '_blank')
    }
    render() {
        const { propertyDetail, emi, uploadedFiles, uploadedFilesByPropertyId } = this.state;
        console.log(localStorage.getItem('role') === 'admin')
        console.log(uploadedFilesByPropertyId);
        return (
            <div className='cards-main'>
                <section className="ftco-section ftco-property-details">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="property-details">
                                    <div >
                                        {propertyDetail.images && propertyDetail.images.length > 0 &&
                                            <img style={{ width: "50%" }} className="img-fluid" src={require(`../src/img/${propertyDetail.images[0].toString()}`)} alt="" />
                                        }
                                    </div>
                                    {/* <div className="img rounded" style={{ backgroundImage: `url(${propert})` }}> jghhhgkjhjgc</div> */}
                                    <div className="text mb-3">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h2 className="text-primary mt-3">{parseInt(propertyDetail.price.toString()).toLocaleString()}</h2>
                                            {localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'builder' ? (
                                                <div>
                                                    {propertyDetail.status === 'sold' ? (
                                                        <img style={{ width: '52px', height: '52px', marginLeft: "460px" }} src={require('../src/img/sold.png')} />

                                                    ) :
                                                        <button className='sold-button' onClick={this.handleStatus}>
                                                            <span> Mark as Sold </span>
                                                        </button>
                                                    }
                                                </div>
                                            ) : null}

                                        </div>
                                        <h2>{propertyDetail.buildingtype}</h2>
                                        <span className="subheading"><i className="fa fa-map-marker-alt text-primary me-2"></i>{propertyDetail.address.streetname}, {propertyDetail.address.city}, {propertyDetail.address.province}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pills">
                                <div className="bd-example bd-example-tabs">
                                    <div className="d-flex">
                                        <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">

                                            <li className="nav-item">
                                                <a className="nav-link active" id="pills-description-tab" data-toggle="pill" href="#pills-description" role="tab" aria-controls="pills-description" aria-expanded="true">Features</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-manufacturer-tab" data-toggle="pill" href="#pills-manufacturer" role="tab" aria-controls="pills-manufacturer" aria-expanded="true">Description</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-emi-tab" data-toggle="pill" href="#pills-emi" role="tab" aria-controls="pills-emi" aria-expanded="true">Calculator</a>
                                            </li>
                                            {localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'builder' ? (
                                                <li className="nav-item">
                                                    <a className="nav-link" id="pills-doc-tab" data-toggle="pill" href="#pills-doc" role="tab" aria-controls="pills-doc" aria-expanded="true">Documents</a>
                                                </li>
                                            ) : null}
                                            {(localStorage.getItem('role') === 'user') || (localStorage.getItem('role') === 'admin') ? (
                                                <li className="nav-item">
                                                    <a className="nav-link" id="pills-web-tab" data-toggle="pill" href="#pills-web" role="tab" aria-controls="pills-web" aria-expanded="true">Webcam</a>
                                                </li>
                                            ) : null}
                                        </ul>
                                    </div>

                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <ul className="features">
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Lot Area: {propertyDetail.area} Sqft</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Bed Rooms: {propertyDetail.bed.toString()}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Bath Rooms: {propertyDetail.bath.toString()}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Basement: {propertyDetail.basement}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Garage: {propertyDetail.garage}</li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul className="features">
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Floor Area: 1,300 SQ FT</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Year Build:: {propertyDetail.builtin.toString()}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Water : {propertyDetail.water}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Stories: {propertyDetail.storey}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Roofing: New</li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul className="features">
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Cooling: {propertyDetail.cooling}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Heating: {propertyDetail.heating}</li>
                                                        <li className="check"><span className="ion-ios-checkmark-circle"></span>Parking: {propertyDetail.parking.toString()}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="pills-manufacturer" role="tabpanel" aria-labelledby="pills-manufacturer-tab">
                                            <p>{propertyDetail.description}</p>
                                        </div>

                                        <div className="tab-pane fade" id="pills-emi" role="tabpanel" aria-labelledby="pills-emi-tab">
                                            <div className="row">
                                                <div className="loan-calculator">
                                                    <div className="top">
                                                        <h2>Loan Calculator</h2>

                                                        <form action="#">
                                                            <div className="group">
                                                                <div className="title">Amount</div>
                                                                <input type="number" value={emi.loanAmount.toString()} className="loan-amount" min={0} onChange={(e) => { this.setState({ emi: { ...emi, loanAmount: parseInt(e.target.value) } }) }} />
                                                            </div>

                                                            <div className="group">
                                                                <div className="title">Interest Rate</div>
                                                                <input type="number" value={emi.interestRate.toString()} className="interest-rate" min={0} onChange={(e) => { this.setState({ emi: { ...emi, interestRate: parseInt(e.target.value) } }) }} />
                                                            </div>

                                                            <div className="group">
                                                                <div className="title">Tenure (in months)</div>
                                                                <input type="number" value={emi.loanTerm.toString()} className="loan-tenure" min={0} onChange={(e) => { this.setState({ emi: { ...emi, loanTerm: parseInt(e.target.value) } }) }} />
                                                            </div>
                                                        </form>
                                                    </div>

                                                    <div className="result">
                                                        <div className="left">
                                                            <div className="loan-emi">
                                                                <h3>Loan EMI</h3>
                                                                <div className='value'>{this.state.emi.totalEmi.toLocaleString('en-US')}</div>
                                                            </div>

                                                            <div className="total-interest">
                                                                <h3>Total Interest Payable</h3>
                                                                <div className='value'>{emi.totalInterest.toLocaleString('en-US')}</div>
                                                            </div>

                                                            <div className="total-amount">
                                                                <h3>Total Amount</h3>
                                                                <div className='value'>{emi.totalAmount.toLocaleString('en-US')}</div>
                                                            </div>

                                                            <button className="calculate-btn" onClick={this.calculateEMI}>Calculate</button>
                                                        </div>

                                                        <div className="right">
                                                            <canvas id="myChart" width="400" height="400"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-doc" role="tabpanel" aria-labelledby="pills-doc-tab">

                                            <div>
                                                {localStorage.getItem('role') === 'user' &&
                                                    <div>

                                                        <input type="file" name='pdf' multiple onChange={this.handleFileChange} />
                                                        <button type="submit" onClick={this.handleSubmit}>Upload</button>
                                                        <br />
                                                        {uploadedFiles && uploadedFiles.length > 0 && uploadedFiles.map((file) => (

                                                            <a style={{ color: "blue" }} onClick={() => { this.getFile() }}>

                                                                {file.filename}
                                                                <br />
                                                                {this.state.file &&

                                                                    <object data={`http://localhost:80/property/files?id=${file.id}`} type="application/pdf" width="100%" height="600px">
                                                                        <p>Sorry, the file could not be displayed.</p>
                                                                    </object>
                                                                }

                                                            </a>
                                                        ))}
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                {localStorage.getItem('role') === 'admin' &&
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="table-wrap">
                                                                <table style={{ marginTop: "20px" }} className="table table-responsive-xl">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Email</th>
                                                                            <th>Username</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {uploadedFilesByPropertyId && uploadedFilesByPropertyId.length > 0 && uploadedFilesByPropertyId.map((uploadedFile: { filename: string, uploadDate: string, userEmail: string, filecontent: Buffer, fileId: string }) => (
                                                                            <tr className="alert" role="alert">
                                                                                <td>
                                                                                    <a style={{ color: "#00B98E" }} onClick={this.getFile} target="_blank">{uploadedFile.filename}
                                                                                    </a>
                                                                                </td>
                                                                                <td className="td">
                                                                                    <div className="table-img" style={{ backgroundImage: `url(${propert})` }}></div>
                                                                                    <div className="pl-3 email">
                                                                                        <span className='td-email'>{uploadedFile.userEmail}</span>
                                                                                        <span className='td-content'>Added: {uploadedFile.uploadDate}</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    {this.state.file &&

                                                                                        <object data={`http://localhost:80/property/files?id=${uploadedFile.fileId}`} type="application/pdf" width="100%" height="600px">
                                                                                            <p>Sorry, the file could not be displayed.</p>
                                                                                        </object>
                                                                                    }
                                                                                </td>

                                                                            </tr>
                                                                            // <tr className="alert" role="alert">

                                                                            //     <td>
                                                                            //         <a style={{ color: "#00B98E" }} href="/" target="_blank">
                                                                            //             Doc15
                                                                            //         </a>
                                                                            //     </td>
                                                                            //     <td className="td">
                                                                            //         <div className="table-img" style={{ backgroundImage: `url(${propert})` }}></div>
                                                                            //         <div className="pl-3 email">
                                                                            //             <span className='td-email'>markotto@email.com</span>
                                                                            //             <span className='td-content'>Added: 01/03/2020</span>
                                                                            //         </div>
                                                                            //     </td>
                                                                            // </tr>
                                                                        ))

                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>

                                        </div>

                                        <div className="tab-pane fade" id="pills-web" role="tabpanel" aria-labelledby="pills-web-tab">
                                            <button className='filter-button' onClick={this.handleLiveDemo}>
                                                <span> Live Demo </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        );
    }
}
export default PropertyDetail;