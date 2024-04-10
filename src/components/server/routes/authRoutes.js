const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser,loginUser,getProfile, logoutUser} = require('./authControllers')

router.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://api.coingecko.com'],
    methods: ["GET", "POST", "PUT", "DELETE"], // Add methods allowed by your server
    allowedHeaders: ["Content-Type", "Authorization"], // Add headers allowed by your server
    
}));


router.get('/', test)
router.post('/register', registerUser)
router.post('/login',loginUser)
router.get("/profile",getProfile)
router.post("/logout", logoutUser); // Add this line for logout route

module.exports = router;