const express = require('express')
const sesssion = require('express-sesssion')
const app=express()
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')
const path= require('path')
const ejs = require('ejs')
const connectDB = require('./db/connectDb')


connectDB();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)



app.listen(9001,()=>{
    console.log('STARTED http://localhost:9001/');
    
})
