const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    images: [ String ], // new images field as an array

    proptype: {
        type: String,
        required: true
    },
    buildingtype: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    address: {
        streetname: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    area: {
        type: String,
        required: true
    },
    bed: {
        type: Number,
        required: true
    },
    bath: {
        type: Number,
        required: true
    },
    garage: {
        type: String,
        required: true
    },
    storey: {
        type: String,
        required: true
    },
    parking: {
        type: Number,
        required: true
    },
    water: {
        type: String,
        required: true
    },
    basement: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cooling: {
        type: String,
        required: true
    },
    heating: {
        type: String,
        required: true
    },
    builtin: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});


const Property = mongoose.model('Property', propertySchema);
module.exports = Property;