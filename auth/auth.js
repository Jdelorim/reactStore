module.exports = {
    ensureAuthenticated: (req,res,next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please Login to view');
        res.redirect('/users/login');
    }

}