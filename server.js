const express = require('express')
const session = require('express-session')
const app=express()
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')
const path= require('path')
const ejs = require('ejs')
const connectDB = require('./db/connectDb')
const nocache = require ('nocache')  

app.use(nocache()); 

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}))
app.use(express.json())




// app.use(session({
//     secret: 'secret key',
//     resave : false,
//     saveUninitialized:true,
//     cookie:{
    //         maxAge:1000*60*60*24
    //     }
    // }))
    // Session Configuration
    
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecretKey', // Use environment variable for security
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, // Set to true if using HTTPS
        httpOnly: true // Helps prevent XSS attacks
    }
}));

// app.use(nocache())

// Apply to all routes
// app.use((req, res, next) => {
    //     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    //     next();
    // });
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        next();
    });
    
    
    
connectDB();


app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).send('Something went wrong!');
});

app.get('/',(req,res)=>{
    res.redirect('/user/login')
}) 

app.listen(9001,()=>{
    console.log('STARTED http://localhost:9001');
    
})
