const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
const productRouter = require('./routers/products');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/products`, productRouter)
 

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database connection is ready...');
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, () => { // a callback will be executed when there is a sucsseful creation of the server 
    console.log('the server is running on http://localhost:3000');
    //console.log(api);
})