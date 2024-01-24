const express = require('express')
const {RegisterUser} = require('../models/user')
const InputValidation = require('../middleware/inputValid')
const passport = require('passport')
const { isNotAuth } = require('../utils/isNotAuth')
const { isAuth } = require('../utils/isAuth')
const router = express.Router()

router.get('/login' ,isNotAuth, (req , res)=>{
    console.log(req.session)
    console.log(req.user)

    res.render('login.ejs')
})


router.post('/login' , passport.authenticate('local' , {
    successRedirect : "/user",
    failureRedirect : "/auth/login",
    failureFlash : true
}) )

router.get('/register', isNotAuth, (req , res)=>{
    const message = req.flash()
    res.render('register.ejs' , {message : message})
})

router.post('/register' ,  isNotAuth ,InputValidation ,  RegisterUser, (req , res)=>{
    res.send('done')
} )

router.get('/logout', isAuth ,(req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


module.exports = router