const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    title:{type:String},
    content:{type:String},
    user:{type:Schema.Types.ObjectId,ref:'users'},
    likedBy:{type:[{type:Schema.Types.ObjectId,ref:'users'}],default:[]}
  },
  { timestamps: true }
);
const POST = mongoose.model("posts", PostSchema);
module.exports = POST;