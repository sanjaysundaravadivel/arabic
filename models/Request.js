const mongoose = require("mongoose");
const RequestSchema = new mongoose.Schema({

  id:{
    type:String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
  
   
  },
  role: {
    type: String,
    required: true,
  },
  data:
  {
     type: String
  }
,
  status:{
    type: String,
  }
});
module.exports = Request = mongoose.model("request", RequestSchema);

