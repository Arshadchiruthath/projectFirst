const userSchema = require('../model/userModel')
const adminSchema = require('../model/adminModel')

//login


const login= async(req, res)=>{
  
  try{
      
      const{username,password} = req.body;

      console.log(username,password);
      
      const user= await adminSchema.findOne({username})


      console.log(user);
      
      if(!user) return res.render('admin/s',{message: 'user does not exist'})
        
        const isMatch = password === user.password
        // console.log('password',isMatch);

        
        if(!isMatch) return res.render('admin/login', {message : 'incorrect password'})

            req.session.user= true;
            
          return  res.redirect('/admin/adminhome' )
    }

    catch(error){
        res.render('admin/login' , {message : 'something went wrong'})
        
    }

}

const adminloadlogin = (req,res)=>{
  res.render('admin/login')
}


const adminloadhome = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await userSchema.find({});

    // Pass the users data to your EJS file
    res.render('admin/adminhome', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


const logout = async (req,res) =>{

  req.session.destroy(()=>{
    res.redirect('/admin/login')
  })

}

const deleteuser = async (req,res) =>{
  
  try{

    const id = req.params.id

    console.log(id);
    
    const user = await userSchema.deleteOne({_id:id})

    if(user){
      res.redirect('/admin/adminhome')
    }
  
  }

  catch(error){
    res.render('/admin/adminhome' ,{message :'something wrong'})
  }
    

}

// const edituser = async (req,res)=>{

//       const { username,password,email,phone } = req.body;

//       console.log(req.body,username,password,email,phone);
      
//       try {
//         // Find user by ID and update the fields
//         const updateData = {
//             username,
//             email,
//             phone,
//         };

        // Update password only if it's provided
        // if (password) {
        //     const bcrypt = require('bcrypt');
        //     const hashedPassword = await bcrypt.hash(password, 10);
        //     updateData.password = hashedPassword;
        // }
        // const user = await userSchema.deleteOne({_id:id})

    //     await userSchema.updateMany(_id, updateData, { new: true });
    //     res.json({ success: true });
    // } catch (error) {
    //     console.error('Error updating user:', error);
    //     res.json({ success: false });
    // }
    // };

    const edituser = async (req, res) => {
      // Extract data from req.body and req.params
      const { id } = req.params; // Assuming you are passing the user ID in the route params
      const { username, password, email, phone } = req.body;
  
      console.log('Received Data:', { id, username, password, email, phone });
  
      try {
          // Prepare the fields to be updated
          const updateData = {
              username,
              email,
              phone,
          };
  
          // Hash the password only if it is provided
          if (password && password.trim() !== '') {
              const hashedPassword = await bcrypt.hash(password, 10);
              updateData.password = hashedPassword;
          }
  
          // Find user by ID and update the fields
          const updatedUser = await userSchema.findByIdAndUpdate(
              id,
              updateData,
              { new: true } // This option returns the updated document
          );
  
          if (updatedUser) {
            res.redirect('/admin/adminhome')
              // res.json({ success: true, message: 'User updated successfully', updatedUser });
          } else {
              res.json({ success: false, message: 'User not found' });
          }
      } catch (error) {
          
        res.render('/admin/adminhome' ,{message :'something wrong'})

          console.error('Error updating user:', error);
          res.json({ success: false, message: 'Failed to update user' });
      }
  };



// const searchuser = async (req,res) =>{  
 
//   const search = req.body
//   console.log("search",req.body,search);
  

//   const users = await userSchema.find({search})
//   res.redirect('/admin/adminhome',{users})
// }


const searchuser = async (req, res) => {
  try {
      // Extract the search term from req.body
      const { search } = req.body;
      console.log("Search Term:", search);

      // If search term is empty, return all users
      let query = {};
      if (search && search.trim() !== '') {
          query = {
              $or: [
                  { username: { $regex: search, $options: 'i' } }, // Case-insensitive search
                  { email: { $regex: search, $options: 'i' } },
                  { phone: { $regex: search, $options: 'i' } }
              ]
          };
      }

      // Find users based on the search query
      const users = await userSchema.find(query);

      // Render the admin home page with the filtered users
      res.render('admin/adminhome', { users });
  } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).send('An error occurred while searching users');
  }
};


module.exports={login,adminloadlogin,adminloadhome,logout,deleteuser,edituser,searchuser}