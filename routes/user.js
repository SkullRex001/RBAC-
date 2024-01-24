const express = require('express')
const { isAuth } = require('../utils/isAuth')
const router = express.Router()

router.get('/' , isAuth, (req , res)=>{
    res.render('profile.ejs')
})


module.exports = router