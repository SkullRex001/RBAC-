module.exports.isNotAuth = (req , res , next) =>{
    if( req.isAuthenticated()) {
        res.redirect('/user')
    }
    else{
        next()
        
    }
}

//user should only be able to go to these routes , if they are not logged in