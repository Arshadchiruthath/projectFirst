const express = require('express')
const session = require('express-session')
const app=express()
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')
const path= require('path')
const ejs = require('ejs')
const connectDB = require('./db/connectDb')
const nocache = require ('nocache')  

connectDB();


app.use(session({
    secret: 'secret key',
    resave : false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

app.use(nocache())

app.use(nocache()); // Apply to all routes
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)



app.listen(9001,()=>{
    console.log('STARTED http://localhost:9001/user/login');
    
})
