const mongoose=require("mongoose")

const shortySchema=new mongoose.Schema({
  full:{
    type: String,
    required:true
  },
  shortUrl:{
    type:String,
    required:true
  },
  clicks:{
    type:Number,
    default:0
  }
})

const short=mongoose.model("shorty",shortySchema)
module.exports=short
