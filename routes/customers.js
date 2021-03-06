'use strict'
const userRoutes = require('express').Router();
const Customers = require('../models/Customers');
const passport = require('passport');



module.exports = (app) => {
    
    userRoutes.route('/register').post((req,res) => {

        console.log(`data coming back: ${JSON.stringify(req.body, null, 3)}`);
        const email = req.body.email;
        Customers.findOne({email}).then(data =>{
            if(data) {
                console.log('hitting here');
                return res.send({ success: false, message: 'Email is already taken!'});
            }
        const newCustomer = new Customers(req.body);
        newCustomer.email = req.body.email.toLowerCase();
         newCustomer.password = newCustomer.generateHash(req.body.password);
        newCustomer.save().then((result) =>{
            console.log(result);
            return res.send({
                success: true,
                message: 'signed up success!'
            });
        }).catch(err =>{
            if(err) return res.status(400).send('adding user failed!');
        })
    })
});

    userRoutes.route('/login').post((req, res, next)=>{   
        let {email, password} = req.body;
        email = req.body.email.toLowerCase();
        console.log(email, password);
        next();
    }, passport.authenticate('local'),(req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
    
    );
   userRoutes.get('/check',(req,res,next) => {
       console.log('hitting here');
      console.log(req.user);
       if(req.user) {
           res.json({ user: req.user });
       } else {
           res.json({ user: null });
       }
   });

   userRoutes.get('/logout',(req,res) => {
    req.logout();
    res.json({msg: 'you are logged out'})
   });

   userRoutes.post('/update',(req,res)=>{
    //    const {firstName, lastName, email, address, city, state, zipcode, phone} = req.body;
       const data = req.body;
       console.log(req.body.firstName, req.body.lastName, req.body.email);
       const uID = req.user._id;
       console.log('up in harr');
       Customers.findByIdAndUpdate(uID,data,{new: true})
        .exec().then(data => {
            console.log(data);
       }).catch(err=>{
            console.log(err);
       })
        
   });

   userRoutes.post('/delete', (req,res)=>{
       const id = req.user._id;
       Customers.findByIdAndDelete(id).exec().then(data => { 
           console.log('DELETED' + data);
       }).catch(err=>{
           console.log(err);
       })
   })
    
    
    app.use('/users', userRoutes);
}