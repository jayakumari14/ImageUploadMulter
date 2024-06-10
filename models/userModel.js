const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/imageUpload");

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
