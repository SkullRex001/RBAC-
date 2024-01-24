const passport = require('passport')
const { User } = require('../models/user')
const LocalStartigy = require('passport-local').Strategy

passport.use(new LocalStartigy(async (username , password , done)=>{

    try{
        const userExist = await User.findOne({
            username
        })
    
        if(!userExist) {
            done(null , false , {message : "User does not exist"}) 
        }
    
        if(password === userExist.password) {
            done(null , userExist )
        }
    
        else{
            done(null , false , {message : "incorrect password/username"})
        }

    }

    catch(err) {
        done(err)
    }

}))

passport.serializeUser(function(user , done){
    done(null , user.id)
})

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
