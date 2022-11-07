const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
// const Profile = require("../../models/Profile");
// @rute POST api/users
// @desc Test route
// @access Public
router.post(
"/",
[
check("name", "Name is required").not().isEmpty(),
check("uid", "Please enter a valid user id").not().isEmpty(),
check("role", "Please enter role").not().isEmpty(),
check(
"password",
"please enter a password with 6 or more characters"
).isLength({ min: 6 }),
],
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}

const { name, uid, password, role } = req.body;

try {
// let user = await User.findOne({ uid });
// if (user) {
// await User.findOneAndRemove({ uid });
// }
let user = new User({
name,
uid,
role,
password,
});
const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);

await user.save();

const payload = {
user: {
id: user.uid,
},
};

// jwt.sign(
// payload,
// config.get("jwtSecret"),
// { expiresIn: 360000 },
// (err, token) => {
// if (err) throw err;
// return res.json({ token });
// }
// );
return res.json({ uid });
} catch (error) {
console.log(error);
res.status(500).send("Server error");
}


// res.send("user route");
}
);

//Get all users
router.get("/", async (req, res) => {
// try {
// const user = await User.find();
// res.json(user);
// } catch (error) {
// console.log(error.message);
// res.status(500).send("Server Error");
// }
// });

// //Delete a user
// router.delete("/:id", auth, async (req, res) => {
// try {
// const user = await User.findById(req.user.id).select("-password");

// if (user.role !== "admin") {
// return res.status(401).json({ msg: "User not authorized " });
// }
// // remove item
// await User.findOneAndRemove({ _id: req.params.id });
// await Profile.findOneAndRemove({ user: req.params.id });

// // res.json(menu);
// res.json({ msg: "user removed" });
// } catch (error) {
// console.log(error.message);
// res.status(500).send("Server Error");
// }
const user = await User.find();
 res.json(user);
});

module.exports = router;