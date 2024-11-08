const userSchema = require('../model/userModel')
const signupUser = async (req, res) => {
    try {
        console.log('suser save');

        const { username,phone,email, password } = req.body;
        console.log(req.body);
        

        console.log(username,phone,email,password);
        

        // Check if the user already exists
        const user = await userSchema.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists', status: false });
        }

        // If user doesn't exist, create a new one
        const newUser = new userSchema({
            username:username,
            phone:phone,
            email: email,
            password: password
        });

        await newUser.save(); // Save the new user
        
        // Send success response
        res.status(200).json({ message: 'User created successfully', status: true });
        
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'An error occurred. Please try again later.', status: false });
    }
};


module.exports={signupUser}