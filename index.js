require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');



app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.post('/api/upload', async (req, res, next) => {

});






const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server is running on : ' + port));