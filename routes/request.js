const express = require("express");
const router = express.Router();
const Request = require("../models/Request");



// @rute POST api/Request
// @desc Create a Request
// @access public
router.post(
"/",
async (req, res) => {

try {
const newRequest = new Request({
id: req.body.id,
name: req.body.name,
uid: req.body.uid,
role: req.body.role,
data: req.body.data,
status: req.body.status,
});
const request = newRequest.save();
res.json({msg:"Success"});
} catch (error) {
console.log(error.message);
res.status(500).send("Server error");
}
}
);

// @rute GET api/orders
// @desc Get all orders
// @access Private

router.get("/", async (req, res) => {
try {
const orders = await Request.find();
res.json(orders);
} catch (error) {
console.log(error.message);
res.status(500).send("Server error");
}
});

// @rute Delete api/orders/:id
// @desc Delete a order
// @access Private

router.delete("/:id", async (req, res) => {
try {
const order = await Request.findById(req.params.id);

await order.remove();

res.json({ msg: "Request removed" });
} catch (error) {
console.log(error.message);
res.status(500).send("Server error");
}
});

module.exports = router;