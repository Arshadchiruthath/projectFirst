const express = require('express')
const router = express.Router();
const adminController = require('../controller/adminController')
const auth = require('../middleware/auth')


router.get('/login', auth.isloginadmin,adminController.adminloadlogin)
 
router.post('/login', adminController.login)

 router.get('/adminhome', adminController.adminloadhome)

router.get('/logout', adminController.logout)

router.post('/logout', adminController.logout)

router.post('/edit-user/:id', adminController.edituser)

// router.get('/admin/delete-user/', adminController.deleteuser)

router.post('/delete-user/:id', adminController.deleteuser)

router.post('/search' ,adminController.searchuser)

// router.post('/search' ,adminController.searchuser)



//   router.get('/adminhome', auth.checkSessionadmin,adminController.adminloadhome)

// router.get('/adminhome', (req,res)=>{
//     res.render('admi')
// })

module.exports=router