const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const shorty=require("./models/shorty")

const app = express()

app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000,function(){
  console.log("App is running on port 3000.")
})

mongoose.connect("mongodb://localhost/27017",{useNewUrlParser:true,useUnifiedTopology:true})

app.get("/",  function(req,res){
  const shortUrl =  shorty.find()
  res.render("indexD",{shortUrls:shortUrl})
})

app.post("/shortUrl", function(req,res){
   shorty.create({full:req.body.fullUrl})
  res.redirect("/")
})
