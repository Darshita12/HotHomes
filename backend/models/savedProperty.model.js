const mongoose = require('mongoose');

const savedPropertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    propertyId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const SavedProperty = mongoose.model('SavedProperty', savedPropertySchema);

module.exports = SavedProperty;