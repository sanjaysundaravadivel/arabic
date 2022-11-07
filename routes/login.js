const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
// @rute GET api/auth
// @desc Test route
// @access Public
router.get("/", async (req, res) => {
try {
const user = await User.findOne({uid:"emp001"}).select("-password");
res.json(user);
} catch (err) {
console.log(err.message);
res.status(500).send("Server Error");
}
});

// @rute POST api/auth
// @desc Authenticate user & get tokenS
// @access Public
router.post(
"/",
[
check("password", "Password is required").exists(),
],
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}

const { uid, password } = req.body;


try {
let user = await User.findOne({ uid });
if (!user) {
return res
.status(200)
.json({ errors: [{ msg: "Invalid credentials" }] });
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
return res
.status(200)
.json({ errors: [{ msg: "Incorrect Password" }] });
}

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
// return res.json({ id:user.id, role: user.role });
// }
// );
return res.json({ id:user.uid, role: user.role,msg:"Success",name:user.name });
} catch (error) {
console.log(error);
res.status(500).send("Server error");
}

// res.send("user route");
}
);

module.exports = router;