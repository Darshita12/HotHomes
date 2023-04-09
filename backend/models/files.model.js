const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const fileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    file_id: { type: mongoose.Schema.Types.ObjectId, required: true},
});

fileSchema.statics.getBucket = function() {
    return new GridFSBucket(mongoose.connection.db, {
      bucketName: 'files'
    });
  };
  
const File = mongoose.model('File', fileSchema);
module.exports = File;