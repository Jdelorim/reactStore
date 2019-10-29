const storeRoutes = require('express').Router();
let Customers = require('../models/Customers');
// require('bcryptjs');

module.exports = (app) => {
    
    storeRoutes.route('/register').post((req,res) => {
        console.log(`data coming back: ${req.body}`);
        const newUser = new Customers(req.body);
        newUser.email = req.body.email.toLowerCase();
        newUser.password = newUser.generateHash(req.body.password);
        newUser.save().then(data =>{
            return res.send({
                success: true,
                message: 'signed up success!'
            })
        }).catch(err =>{
            if(err) return res.status(400).send('adding user failed!');
        })
    });

    app.use('/users', storeRoutes);
}