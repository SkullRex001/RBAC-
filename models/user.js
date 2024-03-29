const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username : String , password : String   
})

const User = mongoose.model('userdata' , UserSchema)

async function RegisterUser( req , res, next) {

    try{
        let username = req.body.username;
        let password = req.body.password;
        let UserExist = await User.findOne({
            username , password
        })
        console.log(UserExist)
    
        if(UserExist) {
            req.flash('databaseMessage' , "user already exist")
            res.redirect('/auth/register')
    
        }
    
        else{
           await User.create({
                username , password
            })
            req.flash('databaseMessage' , 'account created')
            res.redirect('/auth/register')
        }

    }

    catch(err) {
        console.log(err)
        return res.send('505')
    }
    
}

module.exports = {RegisterUser , User}

//Note :- Hashing left