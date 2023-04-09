const express = require('express');
const Property = require('../models/property.model');
const User = require('../models/user.model')
const router = express.Router();
const SavedProperty = require('../models/savedProperty.model');
const mongoose = require('mongoose');
const multer = require('multer');
const app = require('express');
const path = require('path');
const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");
const File = require("../models/files.model");
const { ObjectId } = require('mongodb');

// Grid.mongo = mongoose.mongo;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'real_estate/src/img'); // specify the destination folder
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension); // generate a unique filename with extension
    }
});
const upload1 = multer({ storage: storage });

// Create GridFS storage engine
const storage1 = new GridFsStorage({
    url: "mongodb://darshi:darshi@ac-jalxgkk-shard-00-00.edlshq4.mongodb.net:27017,ac-jalxgkk-shard-00-01.edlshq4.mongodb.net:27017,ac-jalxgkk-shard-00-02.edlshq4.mongodb.net:27017/RealEstateDB?ssl=true&replicaSet=atlas-u0f0i0-shard-0&authSource=admin&retryWrites=true&w=majority",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            filename: file.originalname,
        };
    },
});
// Create GridFS stream object
const conn = mongoose.createConnection("mongodb://darshi:darshi@ac-jalxgkk-shard-00-00.edlshq4.mongodb.net:27017,ac-jalxgkk-shard-00-01.edlshq4.mongodb.net:27017,ac-jalxgkk-shard-00-02.edlshq4.mongodb.net:27017/RealEstateDB?ssl=true&replicaSet=atlas-u0f0i0-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("files");
});

// Create multer upload object with GridFS storage engine
const upload = multer({ storage1 });
// POST to add property
router.post('/', upload1.array('images'), async (req, res) => {

    // Extract the address data from the form data
    const address = JSON.parse(req.body.address);

    // Create new property object from request body
    req.files.map(file => console.log(file))
    // + '.' + file.mimeType.split('/')[1]
    const property = new Property({
        images: req.files.map(file => file.filename), // Initialize an empty array to store the filenames of uploaded images
        proptype: req.body.proptype,
        buildingtype: req.body.buildingtype,
        price: req.body.price,
        address: {
            streetname: address.streetname,
            city: address.city,
            province: address.province,
            pincode: address.pincode
        },
        area: req.body.area,
        bed: req.body.bed,
        bath: req.body.bath,
        garage: req.body.garage,
        storey: req.body.storey,
        parking: req.body.parking,
        water: req.body.water,
        basement: req.body.basement,
        description: req.body.description,
        cooling: req.body.cooling,
        heating: req.body.heating,
        builtin: req.body.builtin,
        status: req.body.status
    });

    try {
        const savedProperty = await property.save();
        console.log('Property added to database:', savedProperty);
        res.json(savedProperty);
        // });
    } catch (err) {
        console.log('Error saving property to database:', err);
        res.status(500).send('Error saving property to database');
    }
});

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();

        // console.log(properties)
        res.json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/detail', async (req, res) => {
    try {
        const id = req.query.id; // extract the ID value from the query parameter 
        const property = await Property.findById(id);
        res.json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/savedproperties', async (req, res) => {
    try {
        const { userId, propertyId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(propertyId)) {
            throw new Error('Invalid userId or propertyId');
        }

        const existingSavedProperty = await SavedProperty.findOne({ userId: userId, propertyId: propertyId });
        if (existingSavedProperty) {
            return res.status(400).send('Property already saved');
        }

        const savedProperty = new SavedProperty({ userId: userId, propertyId: propertyId });
        await savedProperty.save();

        res.json(savedProperty);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/savedProperties', async (req, res) => {
    try {
        const savedProperties = await SavedProperty.find();
        res.json(savedProperties);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/savedpropertiesbyuserid/', async (req, res) => {

    try {
        const userId = req.query.userid;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userId');
        }

        const savedProperties = await SavedProperty.find({ userId: userId }, { propertyId: 1, _id: 0 });
        res.status(200).send(savedProperties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.delete('/savedproperties', async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id)
        const result = await SavedProperty.findOneAndDelete({ propertyId: id });;
        if (!result) {
            res.status(404).json({ error: 'Property not found' });
        } else {
            res.status(200).json({ message: 'Property deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
const filestorage = multer.memoryStorage();
const fileupload = multer({ storage: filestorage });
router.post('/uploadfiles', fileupload.array('files', 10), async (req, res) => {
    try {
        const files = req.files;
        const pdfs = [];
        const bucket = File.getBucket();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uploadStream = bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype,
                metadata: { userId: req.body.userId },
            });
            console.log(file);
            uploadStream.write(file.buffer);
            uploadStream.end();
            // const fileId = uploadStream.id;
            // console.log(fileId);
            const pdf = await File.create({
                propertyId: req.body.propertyId,
                userId: req.body.userId,
                file_id: uploadStream.id
            });

            pdfs.push(pdf);
        }
        res.status(201).json({ pdfs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});
// router.post('/uplodfiles', upload.array("files"), async (req, res) => {
//     try {
//         const { userId, propertyId } = req.body;

//         // Loop through all uploaded files and save them to the File collection
//         const files = req.files.map((file) => {
//             console.log(file.id)
//             console.log(file)
//             return {
//                 userId,
//                 propertyId,
//                 originalName: file.originalname,
//                 fileId: file.id, // GridFS file ID
//                 path: null // Set path property to null for now
//             };
//         });

//         // Save the new files to the database
//         const result = await mongoose.model("File").create(files);
//         res.json({ success: true, files: result });
//         res.status(200).send(savedFiles);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
router.get('/getfiles', async (req, res) => {
    try {
        const userId = req.query.userId;
        const propertyId = req.query.propertyId;
        const files = await File.find({ userId, propertyId });
        console.log(files)
        if (!files) {
            return res.status(404).json({ error: 'Files not found' });
        }
        const bucket = File.getBucket();
        const binaryContents = [];
        await Promise.all(files.map(async (file) => {
            console.log(`this is file: ${file}`)
            const file1 = await mongoose.connection.db.collection('files.files').findOne({ _id: file.file_id });

            console.log(`this is file1: ${file1}`)
            // if (!file1) {
            //     console.error(`File not found for id: ${file.file_id}`);
            //     return;
            // }
            const downloadStream = bucket.openDownloadStream(file1._id);
            // const downloadStream = bucket.openDownloadStream(file1._id);

            // create a buffer to store the file contents
            const chunks = [];
            downloadStream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            downloadStream.on('error', (err) => {
                console.error(err);
                // handle the error
            });
            return new Promise((resolve, reject) => {
                downloadStream.on('end', () => {
                    const fileContents = Buffer.concat(chunks);
                    binaryContents.push({
                        filename: file1.filename,
                        filecontent: fileContents,
                        id: file1._id
                    });
                    resolve();
                });
            });
        }));
        console.log(binaryContents)

        res.status(200).json(binaryContents);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});
// router.get('/getfiles', async (req, res) => {
//     try {
//         const userId = req.query.userId;
//         const propertyId = req.query.propertyId;
//         console.log(userId);
//         console.log(propertyId)
//         // Find all files for the specified user and property
//         const files = await mongoose.model("File").find({ userId, propertyId });
//         const gfs = Grid(conn.db);
//         const readStreams = [];
//         files.map(file => {
//             const bucket = new mongo.GridFSBucket(db);
//             const readStream = bucket.openDownloadStream(fileId);
//             // const readStream = gfs.createReadStream({ _id: file._id });
//             readStream.on('error', (err) => {
//                 reject(err);
//             });
//             readStreams.push(readStream);
//         })

//         // readStreams.pipe(res);
//         // Send the files back to the client
//         res.json({ success: true, readStreams });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
router.get('/getallfilesbypropertyId', async (req, res) => {
    try {
        const propertyId = req.query.propertyId;
        const files = await File.find({ propertyId });
        // console.log(files)
        if (!files) {
            return res.status(404).json({ error: 'Files not found' });
        }
        const bucket = File.getBucket();
        const binaryContents = [];
        await Promise.all(files.map(async (file) => {
            const file1 = await mongoose.connection.db.collection('files.files').findOne({ _id: file.file_id });
            console.log(file1)
            const downloadStream = bucket.openDownloadStream(file1._id);

            // create a buffer to store the file contents
            const chunks = [];
            downloadStream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            downloadStream.on('error', (err) => {
                console.error(err);
                // handle the error
            });
            const userRecord = await User.findById(file.userId).exec();

            return new Promise((resolve, reject) => {
                downloadStream.on('end', () => {
                    const fileContents = Buffer.concat(chunks);
                    // console.log(file1);
                    binaryContents.push({
                        filename: file1.filename,
                        userEmail: userRecord.email,
                        uploadDate: file1.uploadDate,
                        filecontent: fileContents,
                        fileId: file1._id
                    });
                    resolve();
                });
            });
        }));
        console.log(binaryContents)

        res.status(200).json(binaryContents);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});
router.put('/changestatus', async (req, res) => {
    const { id } = req.body;
    const { status } = req.body;
    console.log(id)
    try {
        const property = await Property.findByIdAndUpdate(id, { status }, { new: true });

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        return res.json(property);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
// // create GridFSBucket instance
// const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     bucketName: 'files'
// });

// route to get file data by fileId
router.get('/files', async (req, res) => {
    const bucket = File.getBucket();
    const fileId = new mongoose.Types.ObjectId(req.query.id);
    // const file1 = await mongoose.connection.db.collection('files.files').findOne({ _id: fileId });
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res); 
});

module.exports = router;
