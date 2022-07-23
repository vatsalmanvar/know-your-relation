const express = require("express");
const bcrypt=require('bcryptjs');
const familyschema = require("./models/familyschema");
const userschema=require("./models/userSchema")
const router = express.Router();
const db = require('./db');

router.post("/", async (req, res) => {
  const { family } = req.body;
  const t = await f.run(family);
  if (t) {
    return res.send({ msg: "found" });
  } else {
    return res.send({ msg: " not found" });
  }
});

router.post("/register",async (req,res)=>{
  const {email,password,cpassword}=req.body;
  if(!email || !password || !cpassword){
    res.status(402).json({'msg':"please fill out all the details"})
  }
  try{
    const useralreadyexist=await userschema.findOne({ email: email });
    if(useralreadyexist){
      res.status(666).send({'msg':"user already registered please sign in"})
    }
    else{
      const a = new userschema({email,password})
      await a.save();
      res.status(200).send({'msg':"user registration successfull"});
    }
  }catch(err){
    console.log(err);}
})

router.post("/signin",async (req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    res.status(402).json({'msg':"please fill out all the details"})
  }
  try{
    const useralreadyexist=await userschema.findOne({ email: email });
    console.log("finding user with email");
    if(useralreadyexist){
      const isValid= await bcrypt.compare(password, useralreadyexist.password);
      if(isValid===false){
        console.log('pass wrong')
      res.status(402).send({'msg':"passwrod is wrong"});
      }
      else{
        console.log("pass ok")
        res.status(200).send({'msg':"Sign in successfull"});
      }
    }
    else{
      res.status(402).send({'msg':"User not exist, please register ans then sign in"});
    }
  }catch(err){
    console.log(err);}
})

router.post("/saveFamilyTree",async (req,res)=>{
  const{familyName, email, password, globalNodes, globalEdges}=req.body;
  console.log(familyName, email, password, globalNodes, globalEdges);
  try{
    const family=new familyschema({familyName, email, password, globalNodes, globalEdges});
    await family.save()
    console.log("family tree saved");
  }catch(err){
    console.log(err);
  }
})
router.post('/viewFamilyTree',async (req,res)=>{
  const {familyName}=req.body;
  console.log(req.body);
  console.log("recevied family is:",familyName)
  try{
    const FindFamily=await familyschema.findOne({familyName:familyName});
    if(FindFamily){
      console.log("Family found");
      res.send(FindFamily);
    }
    else{
      console.log("family not found ");
    }
  }catch(err){
    console.log(err);
  }
  
  console.log("view tree")
})

router.post('/getfamilylist',async (req,res)=>{
  const {email,password}=req.body;
  try{
  const user=await familyschema.find({email:email});
  const allFamily=await familyschema.find();
  if(user && allFamily){
    res.status(200).json({user,allFamily})
  }
  else {res.send(null)}
  }catch(err){
    console.log(err);
  }
})
module.exports = router;