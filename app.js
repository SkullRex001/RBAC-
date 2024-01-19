const express = require('express')
const httpErrors = require('http-errors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
app.use(morgan('dev'))

const port = process.env.PORT || 3000

app.listen(port , (err)=>{
    if(err) {
        console.log(err) 

    }
    else{
        console.log(`port ${port} is running`)
    }
})

app.get('/' , (req , res)=>{
    res.send('hello')

})

app.use((req , res , next)=>{
    next(httpErrors.NotFound())
})

app.use((error , req , res , next)=>{
    error.status = error.status || 500
    res.status(error.status).send(error)
})

