const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
    },
    profilePic: {
      type: String
    },
    isAdmin: {
      type: String,
      required: true,
      default: false
    }
}, {
  timestamps : true
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel