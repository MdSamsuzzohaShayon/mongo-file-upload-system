require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const cloudinary = require('cloudinary');
const { cloudinary } = require('./utils/cloudinary');
const upload = require('./utils/multer');



app.set('view engine', "ejs");
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// https://cloudinary.com/documentation/node_integration#configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });




// NOW WE CAN SHOW THIS IMAGE IN CLOUDINARY MEDIA LIBRARY
app.get('/api/raw/upload', async (req, res, next) => {
    // https://cloudinary.com/documentation/node_integration#installation_and_setup
    cloudinary.uploader.upload('messi.jpg')
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
});


// app.post('/api/upload', async (req, res, next) => {

// });






// NOW WE CAN SEE THERE IS NO IMAGE IN CLOUDINARY MEDIA LIBRARY
// https://cloudinary.com/documentation/admin_api
app.get('/api/raw/delete', async (req, res, next) => {
    // https://cloudinary.com/documentation/admin_api#delete_resources
    // https://cloudinary.com/documentation/admin_api#examples-9
    // cloudinary.v2.api.delete_resources(public_ids, options, callback);
    cloudinary.api.delete_resources(['gdgcsep6dszg2cgce5tb'])
        .then(response => {
            return res.json(response);
        })
        .catch(error => {
            return res.json(error);
        });
});











app.get('/api/upload', (req, res, next) => {
    res.render('index');
});
app.post('/api/upload', upload.single('img'), (req, res, next) => {
    console.log(req.file);
    res.status(200).json({ file: req.file });
});









const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server is running on : ' + port));