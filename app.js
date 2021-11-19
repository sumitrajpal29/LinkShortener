const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const shortLink=require("./models/shorty")
const shortId=require("shortid")
const urlExist=require("url-exists")

const app = express()

app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000,function(){
  console.log("App is running on port 3000.")
})

mongoose.connect("mongodb://localhost/shortyDB",{useNewUrlParser:true,useUnifiedTopology:true})



app.post("/shortUrl", async (req,res)=>{
  const URL=req.body.fullUrl
  console.log(URL);
    shortLink.findOne({full:URL},async (err,found)=>{
      if(found){
        res.render("indexD",{shortUrl:"localhost:3000/"+found.shortUrl,VALID:true})
        console.log("Already shorted : "+found.shortUrl)
      }
      else if(!found){
        const exists=await urlExist(URL,async (err,found)=>{
          console.log(found);
          if(found){
            valid=true
            const url = new shortLink({full:URL,shortUrl:shortId.generate()})
            await url.save()
            console.log(url.shortUrl)
            res.render("indexD",{shortUrl:"localhost:3000/"+url.shortUrl,VALID:true})
          }
          else if(!found){
            valid=false
            res.render("indexD",{shortUrl:"localhost:3000/null",VALID:false})
            console.log("not found");
          }
          else
          console.log(err);
        })
      }
      else
      console.log(err);
    })
})


app.get("/",  (req,res)=>{
  res.render("indexD",{shortUrl:"localhost:3000/null",VALID:true})
})

app.get("/:shortUr",(req,res)=>{
  shortLink.findOne({shortUrl:req.params.shortUr},(err,found)=>{
    if(found){
      res.redirect(found.full)
    }
    else
      res.sendStatus(404)
  })
})
