const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const short=require("./models/shorty")

const app = express()

app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000,function(){
  console.log("App is running on port 3000.")
})

mongoose.connect("mongodb://localhost/shortyDB",{useNewUrlParser:true,useUnifiedTopology:true})

let shortyword=null

app.get("/",  (req,res)=>{
  res.render("indexD",{shortUrl:shortyword})
})

app.post("/shortUrl", async (req,res)=>{
  const URL=req.body.fullUrl
  console.log(URL);
  await searchOrCreate(URL)
  res.redirect("/")
})

function searchOrCreate(URL){
  short.findOne({full:URL},async (err,found)=>{
    if(found){
      shortyword=found.shortUrl
      console.log(shortyword)
    }
    else{
    await short.create({full:URL})
      searchOrCreate(URL)
    }
  })
}



app.get("/:shortUr",(req,res)=>{
  short.findOne({shortUrl:req.params.shortUr},(err,found)=>{
    if(found){
      res.redirect(found.full)
    }
    else
      res.sendStatus(404)
  })
})
