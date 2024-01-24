const express = require('express')
const { isAuth } = require('../utils/isAuth')
const router = express.Router()

router.get('/' , isAuth, (req , res)=>{
    const user = req.user
    res.render('profile.ejs' , {user})
})


module.exports = router