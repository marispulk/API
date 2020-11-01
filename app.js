// Import express module (require = angular import)
const express = require("express");
// Call express variable,which in return imports express module.
const app = express();

// Environment variables
require("dotenv/config")

// Dependencies import
const mongoose = require("mongoose"); // Import Mongoose package
const bodyParser = require("body-parser"); // MongoDB // POST call body parser. Converts body to JSON
const rateLimit = require("express-rate-limit");
const cors = require("cors"); // Import Cors

// Import routes
const usersRoute = require("./routes/users");

// Import access control
const accessControl = require("./components/accesscontrol")

// Calculate +1 hour from request limit hit
var resetLimitDatetime = new Date();
resetLimitDatetime.setMinutes(resetLimitDatetime.getMinutes() + 60);

// Limiter control options - 3 different user role levels
const standardUserLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 100, // limit each IP and Standard userRole to 100 requests per windowMs
    message: "You have reached your request limit(100). Your limit will be reset on: " + resetLimitDatetime
});
const premiumUserLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 500, // limit each IP and Premium userRole to 500 requests per windowMs
    message: "You have reached your request limit(500). Your limit will be reset on: " + resetLimitDatetime
});
const eliteUserLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 1000, // limit each IP and Elite userrole to 1000 requests per windowMs
    message: "You have reached your request limit(1000). Your limit will be reset on: " + resetLimitDatetime
});

// Set tester IP to userRole for different rate limit sttings (standard, Premium, Elite),default is Standard
var userRole = "Standard";

// Middleware
app.use(cors());
app.use(accessControl);
app.use(bodyParser.json());

// Rate limiter different option levels
if(userRole == "Standard") {
    app.use("/users", standardUserLimiter);
} else if (userRole == "Premium") {
    app.use("/users", premiumUserLimiter);
} else if (userRole == "Elite") {
    app.use("/users", elitemUserLimiter);
}
app.use("/users", usersRoute);

//Routes
app.get("/", (req, res) => {
    res.send("Home");
})

// Connect to DB (MongoDB)
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => {
    console.log("Connected to MongoDB!");
})

// Starts server and listens to port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
})


