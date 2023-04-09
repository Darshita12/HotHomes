import React from "react";
import '../src/CSS/addProperty.css'
import { AddPropertyState, Property } from "./models/property.model";
import { PropertyService } from "./services/property.service";
let valid: boolean = true;
class AddProperty extends React.Component<any, AddPropertyState>{
    constructor(props: any) {
        super(props);
        this.state = {
            address: {
                city: '',
                province: '',
                streetname: '',
                pincode: ''
            },
            area: '',
            basement: '',
            bath: 0,
            bed: 0,
            builtin: 0,
            cooling: '',
            description: '',
            garage: '',
            heating: '',
            parking: 0,
            price: '',
            storey: '',
            buildingtype: '',
            proptype: '',
            water: '',
            files: [],
            message: ''
        }
    }
    handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const { files: currentFiles } = this.state;
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

        if (files) {
            const updatedFiles = [...currentFiles];

            for (let i = 0; i < files.length; i++) {
                const fileType = files[i].type;
                if (validImageTypes.includes(fileType)) {
                    updatedFiles.push(files[i]);
                } else {
                    this.setState({ message: "Only images accepted" });
                }
            }

            this.setState({ files: updatedFiles });
        }
    };
    handleSubmit = (e: any) => {
        // Check that Property Type and Building Type fields are selected
        e.preventDefault();
        console.log('jgycghb')
        if (!this.state.proptype || !this.state.buildingtype) {
            valid = false;
        }

        // Check that Price is a positive number
        if (parseInt(this.state.price.toString()) <= 0 || isNaN(parseInt(this.state.price.toString()))) {
            valid = false;
        }

        // Check that Bedrooms, Bathrooms, Storeys, Garage, Parking Spot, and Built In fields are positive integers
        console.log(this.state.bed)
        console.log(this.state.bath)
        console.log(this.state.storey)
        console.log(this.state.garage)
        console.log(this.state.parking)
        console.log(this.state.builtin)

        // if (!Number.isInteger(this.state.bed) || this.state.bed < 1 ||
        //     !Number.isInteger(this.state.bath) || this.state.bath < 1 ||
        //     !Number.isInteger(this.state.storey) || parseInt(this.state.storey.toString()) < 1 ||
        //     !Number.isInteger(this.state.garage) || parseInt(this.state.garage.toString()) < 0 ||
        //     !Number.isInteger(this.state.parking) || this.state.parking < 0 ||
        //     !Number.isInteger(this.state.builtin) || this.state.builtin < 0) {
        if (typeof this.state.bed === 'undefined' ||
            typeof this.state.bath === 'undefined' ||
            typeof this.state.storey === 'undefined' ||
            typeof this.state.garage === 'undefined' ||
            typeof this.state.parking === 'undefined' ||
            typeof this.state.builtin === 'undefined') {
            valid = false;
        }

        // Check that Area is a positive number
        if (parseInt(this.state.area.toString()) <= 0 || isNaN(parseInt(this.state.area.toString()))) {
            valid = false;
        }

        // Check that Basement field has a valid value
        if (this.state.basement !== "yes" && this.state.basement !== "no") {
            valid = false;
        }
        if (this.state.files.length < 0) {
            valid = false;
        }
        console.log(valid);
        if (valid) {
            const formData = new FormData();

            formData.append('proptype', this.state.proptype);
            formData.append('buildingtype', this.state.buildingtype);
            formData.append('price', this.state.price.toString());
            formData.append('area', this.state.area.toString());
            formData.append('bed', this.state.bed.toString());
            formData.append('bath', this.state.bath.toString());
            formData.append('garage', this.state.garage.toString());
            formData.append('storey', this.state.storey.toString());
            formData.append('parking', this.state.parking.toString());
            formData.append('water', this.state.water.toString());
            formData.append('basement', this.state.basement.toString());
            formData.append('description', this.state.description.toString());
            formData.append('cooling', this.state.cooling.toString());
            formData.append('heating', this.state.heating.toString());
            formData.append('builtin', this.state.builtin.toString());
            formData.append('status', 'available');
            formData.append('address', JSON.stringify({
                streetname: this.state.address.streetname,
                city: this.state.address.city,
                province: this.state.address.province,
                pincode: this.state.address.pincode
            }));
            this.state.files.forEach(file => {
                formData.append('images', file);
            });
            const propertyService = new PropertyService();
            propertyService.addProperty(formData).then((response) => {
                // this.setState({ propertyList: response.data });
                console.log(response);
            })
                .catch((error) => {
                    console.error(`Failed to fetch property data: ${error.message}`);
                });
        }
        this.props.history.push('/');
    }
    removeImage = (name: string) => {
        const { files } = this.state;
        const updatedFiles = files.filter((file) => file.name !== name);
        this.setState({ files: updatedFiles });
    };
    render() {
        const { files, message } = this.state;
        return (
            <div className="cards-main">
                <div className="formbold-form-wrapper">
                    {/* <form method="POST"> */}
                    <div className="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
                        <div className="">
                            <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">{message}</span>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd" />
                                        </svg>
                                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Select a photo
                                        </p>
                                    </div>
                                    <input type="file" onChange={this.handleFile} className="opacity-0" multiple name="files[]" />
                                </label>
                            </div>
                            <div className="img-wrap flex-wrap gap-2 mt-2">
                                {files.map((file, key) => {
                                    return (
                                        <div key={key} className="overflow-hidden relative">
                                            <i onClick={() => { this.removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"></i>
                                            <img className="img-preview" src={URL.createObjectURL(file)} alt={`file ${key}`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="formbold-mb-3">
                        <label className="formbold-form-label">Property Type</label>

                        <select className="formbold-form-input" name="propertytype" value={this.state.proptype} onChange={(e) => { this.setState({ proptype: e.target.value }) }} id="propertytype">
                            <option value="">Choose Type</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>

                    <div className="formbold-mb-3">
                        <label className="formbold-form-label">Building Type</label>

                        <select className="formbold-form-input" value={this.state.buildingtype} onChange={(e) => { this.setState({ buildingtype: e.target.value }) }} name="buildingtype" id="buildingtype">
                            <option value="">Choose Type</option>
                            <option value="Apartment">Condo/Apartment</option>
                            <option value="House">House</option>
                            <option value="TownHouse">Town House</option>
                        </select>
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="price" className="formbold-form-label"> Price </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={parseInt(this.state.price.toString())}
                            placeholder="price"
                            onChange={(e) => { this.setState({ price: e.target.value }) }}
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="bedrooms" className="formbold-form-label"> Bedrooms </label>
                        <input
                            type="number"
                            name="bed"
                            id="bedrooms"
                            value={this.state.bed.valueOf()}
                            onChange={(e) => { this.setState({ bed: parseInt(e.target.value) }) }}
                            placeholder="Enter no of bedrooms"
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="bathrooms" className="formbold-form-label"> Bathrooms </label>
                        <input
                            type="number"
                            name="bath"
                            id="bathrooms"
                            value={this.state.bath.valueOf()}
                            onChange={(e) => { this.setState({ bath: parseInt(e.target.value) }) }}
                            placeholder="Enter no of bathrooms"
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="storeys" className="formbold-form-label"> Storeys </label>
                        <input
                            type="number"
                            name="storey"
                            id="storey"
                            value={this.state.storey.valueOf()}
                            onChange={(e) => { this.setState({ storey: e.target.value }) }}
                            placeholder="Enter Storey"
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="garage" className="formbold-form-label"> Garage </label>
                        <input
                            type="number"
                            name="garage"
                            id="garage"
                            value={this.state.garage.valueOf()}
                            onChange={(e) => { this.setState({ garage: e.target.value }) }}
                            placeholder="Enter No of Garage"
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="area" className="formbold-form-label"> Area </label>
                        <input
                            type="number"
                            name="area"
                            id="area"
                            value={this.state.area.valueOf()}
                            placeholder="Enter property area in Sqft"
                            onChange={(e) => { this.setState({ area: e.target.value }) }}
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="parking" className="formbold-form-label"> Parking Spot </label>
                        <input
                            type="number"
                            name="parking"
                            id="parking"
                            value={this.state.parking.valueOf()}
                            onChange={(e) => { this.setState({ parking: parseInt(e.target.value) }) }}
                            placeholder="Enter no of Parking Spot"
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="builtin" className="formbold-form-label"> Built In </label>
                        <input
                            type="number"
                            name="builtin"
                            id="builtin"
                            value={this.state.builtin.valueOf()}
                            onChange={(e) => { this.setState({ builtin: parseInt(e.target.value) }) }}
                            placeholder="Enter Built In Year"
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label className="formbold-form-label">Basement </label>

                        <select className="formbold-form-input" value={this.state.basement.toString()} onChange={(e) => { this.setState({ basement: e.target.value }) }} name="basement" id="basement">
                            <option value="">Choose Type</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="formbold-mb-3">
                        <label className="formbold-form-label">Air Conditioner </label>

                        <select className="formbold-form-input" value={this.state.cooling.toString()} onChange={(e) => { this.setState({ cooling: e.target.value }) }} name="cooling" id="cooling">
                            <option value="">Choose Type</option>
                            <option value="yes">Available</option>
                            <option value="no">Not Available</option>
                        </select>
                    </div>
                    <div className="formbold-mb-3">
                        <label className="formbold-form-label">Heater </label>

                        <select className="formbold-form-input" onChange={(e) => { this.setState({ heating: e.target.value }) }} value={this.state.heating.toString()} name="heating" id="heating">
                            <option value="">Choose Type</option>
                            <option value="yes">Available</option>
                            <option value="no">Not Available</option>
                        </select>
                    </div>
                    <div className="formbold-mb-3">
                        <label className="formbold-form-label">Water </label>

                        <select className="formbold-form-input" value={this.state.water.toString()} onChange={(e) => { this.setState({ water: e.target.value }) }} name="water" id="water">
                            <option value="">Choose Type</option>
                            <option value="yes">Available</option>
                            <option value="no">Not Available</option>
                        </select>
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="description" className="formbold-form-label"> Property Description </label>
                        <textarea
                            name="description"
                            id="description"
                            value={this.state.description.toString()}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                            placeholder="Enter Description"
                            className="formbold-form-input"
                        />
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="streetname" className="formbold-form-label"> StreetName  </label>
                        <input
                            type="text"
                            name="streetname"
                            id="streetname"
                            value={this.state.address.streetname.toString()}
                            onChange={(e) => { this.setState({ address: { ...this.state.address, streetname: e.target.value } }) }}
                            placeholder="Enter Streetname"
                            className="formbold-form-input formbold-mb-3"
                        />
                        <label htmlFor="city" className="formbold-form-label"> City </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={this.state.address.city.toString()}
                            onChange={(e) => { this.setState({ address: { ...this.state.address, city: e.target.value } }) }}
                            placeholder="Enter City"
                            className="formbold-form-input"
                        />

                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="province" className="formbold-form-label"> Province </label>
                            <input
                                type="text"
                                name="province"
                                id="province"
                                value={this.state.address.province.toString()}
                                onChange={(e) => { this.setState({ address: { ...this.state.address, province: e.target.value } }) }}
                                placeholder="Enter Province"
                                className="formbold-form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="post" className="formbold-form-label"> Post/Zip code </label>
                            <input
                                type="text"
                                name="post"
                                id="post"
                                value={this.state.address.pincode.toString()}
                                onChange={(e) => { this.setState({ address: { ...this.state.address, pincode: e.target.value } }) }}
                                placeholder="ex:8976"
                                className="formbold-form-input"
                            />
                        </div>

                    </div>

                    <div className="formbold-checkbox-wrapper">
                        <label htmlFor="supportCheckbox" className="formbold-checkbox-label">
                            <div className="formbold-relative">
                                <input
                                    type="checkbox"
                                    id="supportCheckbox"
                                    className="formbold-input-checkbox"
                                />
                                <div className="formbold-checkbox-inner">
                                    <span className="formbold-opacity-0">
                                        <svg
                                            width="11"
                                            height="8"
                                            viewBox="0 0 11 8"
                                            className="formbold-stroke-current"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.81868 0.688604L4.16688 5.4878L2.05598 3.29507C1.70417 2.92271 1.1569 2.96409 0.805082 3.29507C0.453266 3.66742 0.492357 4.24663 0.805082 4.61898L3.30689 7.18407C3.54143 7.43231 3.85416 7.55642 4.16688 7.55642C4.47961 7.55642 4.79233 7.43231 5.02688 7.18407L10.0696 2.05389C10.4214 1.68154 10.4214 1.10233 10.0696 0.729976C9.71776 0.357624 9.17049 0.357625 8.81868 0.688604Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            I agree to the defined terms, conditions, and policies
                        </label>
                    </div>
                    {!valid &&
                        <div style={{ color: "red" }}> Please fill the required fields.</div>
                    }
                    <button className="formbold-btn" onClick={this.handleSubmit}>Submit</button>
                    {/* </form> */}
                </div>
            </div>
        )
    }
}
export default AddProperty;