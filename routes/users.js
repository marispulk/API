// Import express module (require = angular import)
const express = require("express");

const router = express.Router();

//Import User model
const User = require("../models/User");

// Routes. If somebody makes a get call (goes to /users address), then return userlist array as JSON.
router.get("/", async (req, res) => {

    // Try to get users from MongoDB
    try {
        const user = await User.find(); // Return all user rows from MongoDB
        res.json(user);
        console.log("Successful GET");
    } catch (error) { // Only do catch if try failed
        res.json({ message: error })
    }
})

// POST API CALL
router.post("/", async (req, res) => {
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        useremail: req.body.useremail
    });

    // Try to post new user to MongoDB
    try {
        // Call and wait for MongoDB save result
        const savedUser = await user.save();
        res.json(savedUser);
        console.log("Successful POST");
    } catch (error) { // Only do catch if try failed
        res.json({ message: error })
    }

})

module.exports = router;