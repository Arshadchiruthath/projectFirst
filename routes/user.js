const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')


router.get('/login',(req,res)=>{
    res.render('user/login')
})
router.post('/login',(req,res)=>{
    res.render('user/login')
})

router.get('/signup',(req,res)=>{
    res.render('user/signup')
})
router.post('/signup', userController.signupUser)

module.exports=router