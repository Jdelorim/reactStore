const storeRoutes = require('express').Router();
const regRoutes = require('express').Router();
let Customers = require('../models/Customers');
const passport = require('passport');
const {ensureAuthenticated} = require('../auth/auth');


module.exports = (app) => {
    
    storeRoutes.route('/register').post((req,res) => {

        console.log(`data coming back: ${JSON.stringify(req.body, null, 3)}`);
        const { firstName, lastName, email, password } = req.body;
        Customers.findOne({email}).then(data =>{
            if(data) {
                console.log('hitting here');
                return res.send({ success: false, message: 'Email is already taken!'});
            }
        const newCustomer = new Customers(req.body);
        newCustomer.email = req.body.email.toLowerCase();
         newCustomer.password = newCustomer.generateHash(req.body.password);
        newCustomer.save().then(() =>{
            return res.send({
                success: true,
                message: 'signed up success!'
            });
        }).catch(err =>{
            if(err) return res.status(400).send('adding user failed!');
        })
    })
});

    storeRoutes.route('/login').post((req, res, next)=>{   
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
   storeRoutes.get('/check',(req,res,next) => {
       console.log('hitting here');
       console.log(req.user);
       if(req.user) {
           res.json({ user: req.user });
       } else {
           res.json({ user: null });
       }
   });

   storeRoutes.get('/logout',(req,res) => {
    req.logout();
    res.json({msg: 'you are logged out'})
   })
    
    app.use('/', regRoutes);
    app.use('/users', storeRoutes);
}