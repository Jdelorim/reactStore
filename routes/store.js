'use strict'

const storeRoutes = require('express').Router();
const Products = require('../models/Products');

module.exports = app => {
    storeRoutes.route('/products').get((req, res)=>{
        console.log('in products route');
        console.log(req.user);
        Products.find({}).then(data => {
            if(data) {
                console.log(data);
                return res.send(data);
            }
        }).catch(err=>{
            if(err) return res.status(400).send("Can't find products");
        })
    });
        
    


    app.use('/store', storeRoutes);
}
