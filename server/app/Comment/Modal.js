const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CommentSchema = new Schema(
  {
    content:{type:String},
    user:{type:Schema.Types.ObjectId,ref:'users'},
    post:{type:Schema.Types.ObjectId,ref:'posts'},
  },
  { timestamps: true }
);
const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;