const mongoose = require("mongoose");
const db = "mongodb+srv://sanjay:sanjay@cluster0.kbpkj8f.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
try {
await mongoose.connect(db, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log("Mongo db connected");
} catch (error) {
console.log(error.message);
// Exit process with failure
process.exit(1);
}
};

module.exports = connectDB;