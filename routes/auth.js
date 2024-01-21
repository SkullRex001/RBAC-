const express = require('express')
const RegisterUser = require('../models/user')
const InputValidation = require('../middleware/inputValid')
const router = express.Router()

router.get('/login' , (req , res)=>{
    res.render('login.ejs')
})


router.post('/login' , (req , res)=>{
    res.send('loginPost')
} )

// router.get('/register',  (req , res)=>{
//     const message = req.flash('error')
//     const message2 = req.flash('success')
//     res.render('register.ejs' , {message : message , message2 : message2})
// })
router.get('/register',  (req , res)=>{
    const message = req.flash()
    res.render('register.ejs' , {message : message})
})


router.post('/register' ,InputValidation ,  RegisterUser, (req , res)=>{
    res.send('done')
} )

router.get('/logout' , (req , res)=>{
    res.send('logout')
})

module.exports = router