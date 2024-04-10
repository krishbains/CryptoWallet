const express = require("express");
const dotenv = require("dotenv").config()
const cors = require("cors");
const {mongoose} = require('mongoose')
const app = express();
const cookieParser = require("cookie-parser")

//data base connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database not connected", err))

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))


app.use("/", require('./routes/authRoutes'))


// Custom CORS middleware
app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:3000", '*']; // Add your frontend URL(s) here

const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
}
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, *"
);
res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS, *" // Add other allowed methods as needed
);
res.setHeader(
    "Access-Control-Request-Method",
    "*"
);

if (req.method === "OPTIONS") {
    // Preflight request
    res.status(200).end();
} else {
    next();
}
});

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))