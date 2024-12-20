const userSchema = require('../model/userModel')

const bcrypt = require('bcrypt')

const saltround = 10;

const signupUser = async (req, res) => {
    try {
        // console.log('suser save');

        const { username, phone, email, password } = req.body;
        // console.log(req.body);


        console.log(username, phone, email, password);


        // Check if the user already exists
        const user = await userSchema.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists', status: false });
        }

        const hashedpassword = await bcrypt.hash(password, saltround)

        // If user doesn't exist, create a new one
        const newUser = new userSchema({
            username: username,
            phone: phone,
            email: email,
            password: hashedpassword
        });

        await newUser.save(); // Save the new user



        // Send success response
        res.status(200).json({ message: 'User created successfully', status: true });

    } catch (error) {
        console.log("Error:", error);

        res.render('user/signup', { message: 'something went wrong' })
        res.status(500).json({ message: 'An error occurred. Please try again later.', status: false });
    }
};

//login


const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userSchema.findOne({ email })


        if (!user) return res.render('user/login', { message: 'user does not exist' })

        const isMatch = await bcrypt.compare(password, user.password)
        console.log('password', isMatch);

        if (!isMatch) return res.render('user/login', { message: 'incorrect password' })

        req.session.user = true;
        req.session.email = user.email;

        return res.redirect('/user/home')
        //   return  res.render('user/userhome' ,{username : user.username})
    }

    catch (error) {
        console.log(error)
        res.render('user/login', { message: 'something went wrong' })

    }

}

const loadsignup = (req, res) => {
    res.render('user/signup')
}
const loadlogin = (req, res) => {
    res.render('user/login')
}

const loadhome = async (req, res) => {
    const email = req.session.email
    const user = await userSchema.findOne({ email })

    if (!user) return res.render('user/login', { message: 'user does not exist' })
    return res.render('user/userhome', { username: user.username })
}


const logout = async (req, res) => {

    req.session.destroy(() => {
        res.redirect('/user/login')
    })

}

const signupsend = async (req, res) => {

    res.redirect('/user/signup')
}



module.exports = { signupUser, loadlogin, loadsignup, loadhome, signupsend, login, logout }