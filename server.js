const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./conn")
const port = process.env.PORT || 5000;
const path = require("path")
connectDB();
app.use(cors());
app.use(express.json());
app.use("/login",require("./routes/login"));
app.use("/users",require("./routes/users"));
app.use("/request",require("./routes/request"));
//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  
  app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  }
// get driver connection

 
app.listen(port, () => {
  // perform a database connection when server starts
 
  console.log(`Server is running on port: ${port}`);
});