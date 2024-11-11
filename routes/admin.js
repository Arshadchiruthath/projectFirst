const express = require('express')
const router = express.Router();
const adminController = require('../controller/adminController')
const auth = require('../middleware/auth')


router.get('/login', auth.isloginadmin,adminController.adminloadlogin)
 
router.post('/login', adminController.login)

router.get('/adminhome', auth.checkSessionadmin,adminController.adminloadhome)

module.exports=router