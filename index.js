require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cloudinary = require('cloudinary');
// const {cloudinary} = require('./utils/cloudinary');



app.set('view engine', "ejs");
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// https://cloudinary.com/documentation/node_integration#configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});




// NOW WE CAN SHOW THIS IMAGE IN CLOUDINARY MEDIA LIBRARY
app.get('/api/upload', async (req, res, next) => {
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


app.post('/api/upload', async (req, res, next) => {

});






// NOW WE CAN SEE THERE IS NO IMAGE IN CLOUDINARY MEDIA LIBRARY
// https://cloudinary.com/documentation/admin_api
app.get('/api/delete', async (req, res, next) => {
    // https://cloudinary.com/documentation/admin_api#delete_resources
    // https://cloudinary.com/documentation/admin_api#examples-9
    // cloudinary.v2.api.delete_resources(public_ids, options, callback);
    cloudinary.v2.api.delete_resources(['xqgdrpqjrfzdbjo99em9'])
        .then(response => {
            return res.json(response);
        })
        .catch(error => {
            return res.json(error);
        });
});









const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server is running on : ' + port));