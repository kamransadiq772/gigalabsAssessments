const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    firstName:{type:String},
    lastName:{type:String},
    userName:{type:String},
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.model("users", UserSchema);
module.exports = User;
