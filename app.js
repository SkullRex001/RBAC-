const express = require('express')
const httpErrors = require('http-errors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoSession = require('connect-mongo')(session)
const connectFlash = require('connect-flash')
const passport = require('passport')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'))
mongoose.connect(process.env.MONGO + 'RBAC2').then(()=>{
    const port = process.env.PORT || 3000
    app.listen(port , (err)=>{
        if(err) {
            console.log(err) 
    
        }
        else{
            console.log(`port ${port} is running`)
        }
    })
    

}).catch((err)=>{
    return console.log(err)
    
})

const store = new MongoSession({
    mongooseConnection :mongoose.connection,
    collection : 'session'
})

app.set('view-engine' , 'ejs')
app.use(session({
    secret : process.env.SECREAT,
    resave : false,
    saveUninitialized : false,
    store : store,
    cookie : {
        httpOnly : true
    }

}))

app.use(passport.initialize())
app.use(passport.session())
require('./utils/passport')

app.use((req , res, next)=>{
    res.locals.user = req.user
    next()
})  //rethink this

app.use( (req , res , next)=>{
    console.log(req.session)
    console.log(req.user)
    next()
})

app.use(connectFlash())

app.use('/' , require('./routes/index'))
app.use('/auth' , require('./routes/auth'))
app.use('/user' , require('./routes/user'))

app.use((req , res , next)=>{
    next(httpErrors.NotFound())
})

app.use((error , req , res , next)=>{
    error.status = error.status || 500
    res.render('pagenotfound.ejs' , { error : error})
})

