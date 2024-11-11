const userSchema = require('../model/adminModel')

//login


const login= async(req, res)=>{
  
  try{
      
      const{email,password} = req.body;
      
      const user= await userSchema.findOne({email})
      console.log('admin',admin);
      
      if(!user) return res.render('admin/login',{message: 'user does not exist'})
        
        const isMatch = await bcrypt.compare(password,admin.password)
        console.log('password',isMatch);
        
        if(!isMatch) return res.render('admin/login', {message : 'incorrect password'})

            req.session.user= true;
            
          return  res.render('admin/adminhome' , { message:'login successfull'})
    }

    catch(error){
        res.render('admin/login' , {message : 'something went wrong'})

    }

}

const adminloadlogin = (req,res)=>{
  res.render('admin/login')
}

const adminloadhome = (req,res) =>{
  res.render('admin/adminhome')
}


module.exports={login,adminloadlogin,adminloadhome}