const express = require('express')
const RegisterUser = require('../models/user')
const router = express.Router()

router.get('/login' , (req , res)=>{
    res.render('login.ejs')
})


router.post('/login' , (req , res)=>{
    res.send('loginPost')
} )

router.get('/register' , (req , res)=>{
    res.render('register.ejs')
})


router.post('/register' , RegisterUser, (req , res)=>{
    res.send('done')
} )

router.get('/logout' , (req , res)=>{
    res.send('logout')
})

module.exports = router