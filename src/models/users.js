const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already exists in database!"]
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    unique: false
  },
  confirm_password: {
    type: String,
    required: true,
    minLength: 8,
    unique: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Users", usersSchema);