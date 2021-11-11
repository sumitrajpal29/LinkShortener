const mongoose=require("mongoose")
const shortId=require("shortid")

const shortySchema=new mongoose.Schema({
  full:{
    type: String,
    required:true
  },
  short:{
    type:String,
    default:shortId.generate
  },
  clicks:{
    type:Number,
    default:0
  }
})

const short=mongoose.model("shorty",shortySchema)
module.exports=short
