const express = require('express')
const { isNotAuth } = require('../utils/isNotAuth')
const router = express.Router()

router.get('/' , isNotAuth ,(req , res)=>{
   res.render('index.ejs') 
})

module.exports = router