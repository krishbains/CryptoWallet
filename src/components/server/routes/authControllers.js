const test = (req, res) => {
    res.json("test is working")
}
const { constants } = require('buffer')
const {hashPassword, comparePassword} = require('../helpers/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//Register end point
const registerUser = async (req, res) => {
    try{
        const {username,password} = req.body;
        // Check if name was entered
        if(!username){
            return res.json({
                error: 'name is required'
            })
        }
        // Check if password is good
        if(!password || password.length < 6){
            return res.json({
                error:'Password is required and must be at least 6 characters long.'
            })
        };
        const exist = await User.findOne({username});
        if(exist){
            return res.json({
                error: 'Username is taken already'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            username,
            password: hashedPassword,
        })
        return res.json(user)
    } catch(error){
        console.log('error is', error);
    }
}

//Login endpoint
const loginUser = async (req,res)=>{
    try{
        const {username, password} = req.body;
        
        // Check if user exists
        const user = await User.findOne({username});
        if(!user) {
            return res.json({
                error: 'No user found'
            });
        }
        
        // Check if passwords match
        const match  = await comparePassword(password, user.password);
        if(match){
            // Sign the JWT token
            jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                
                // Set the cookie
                res.cookie('token', token);
                
                // Send the user data along with the response
                res.json({
                    message: 'Login successful',
                    user: {
                        username: user.username,
                        // Include other user data here if needed
                    }
                });
            });
        } else {
            return res.json({
                error: 'Passwords do not match'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
}

const getProfile = (req,res) =>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    } else{
        res.json(null)
    }
}
const logoutUser = async (req, res) => {
    try {
        // Clear any session data or token associated with the user
        // Example: Clearing JWT token from cookies
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
}


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}