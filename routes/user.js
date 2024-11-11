const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

// router.get('/login',(req,res)=>{
//     res.render('user/login')
// })


router.get('/login', auth.islogin,userController.loadlogin)
 
router.post('/login', userController.login)

router.get('/signup',userController.loadsignup)

router.post('/signup', userController.signupUser)

router.get('/userhome', auth.checkSession,userController.loadhome)



// router.post('/user/login',(req,res)=>{
//     res.render('user/userhome')
// })

// router.get('/user/login',(req,res)=>{
//     res.render('user/userhome')
// })

// router.post('/login', userController.userlogin)

module.exports=router