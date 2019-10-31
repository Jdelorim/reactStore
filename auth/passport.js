const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Customers = require('../models/Customers');

module.exports = passport => {
    
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done)=>{
            let lowEmail = email.toLowerCase();
            Customers.findOne({email: lowEmail}).then(user => {
                if(!user) {
                    return done(null, false, {message: 'email is not registered'});
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'passwords incorrect'});
                    }
                })
            }).catch(err => {
                if(err) {
                    console.log(err);
                }
            })
        })
    );
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=> {
        Customers.findById(id,(err,user)=>{
            done(err, user);
        });
    });
}