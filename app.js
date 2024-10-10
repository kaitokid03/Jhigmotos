const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParaser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bryanpogilang:Nayrb082602@jhigmoto.5o8o6.mongodb.net/');
mongoose.Promise = global.Promise

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParaser.json());
app.use(bodyParaser.urlencoded({extended: true}));

//routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;