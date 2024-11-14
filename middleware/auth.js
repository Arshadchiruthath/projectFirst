


const checkSession = (req,res,next)=>{
    if( req.session.user){
        next()
    } else {
        res.redirect('/user/login')
    }
}
const islogin = (req,res,next)=>{
    if( req.session.user){
        // next()
        res.redirect('/user/userhome')

    } else {
        next()
    }
}


const checkSessionadmin = (req,res,next)=>{
    if( req.session.admin){
        next()
    } else {
        res.redirect('/admin/login')
    }
}
const isloginadmin = (req,res,next)=>{
    if( req.session.admin){
        // next()
        res.redirect('/admin/adminhome')

    } else {
        next()
    }
}


module.exports = {checkSession,islogin,checkSessionadmin,isloginadmin}
