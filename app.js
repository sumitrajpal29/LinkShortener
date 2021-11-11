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

app.get("/",  function(req,res){
  res.render("indexD",{shortUrl:shortyword})
})

app.post("/shortUrl", function(req,res){
   const url=short.findOne({full:req.body.fullUrl},function(err,found){
     if(found)
     shortyword=found.shortUrl
     else
     short.create({full:req.body.fullUrl})
   })
   console.log(shortyword)
  res.redirect("/")
})
