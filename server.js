const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./conn")
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/login",require("./routes/login"));
app.use("/users",require("./routes/users"));
app.use("/request",require("./routes/request"));
// get driver connection
connectDB();
 
app.listen(port, () => {
  // perform a database connection when server starts
 
  console.log(`Server is running on port: ${port}`);
});