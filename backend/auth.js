const axios=require('axios')
const express = require("express");
const familyschema = require("./models/familyschema");
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

router.post("/saveFamilyTree",async (req,res)=>{
  const{familyName, globalNodes, globalEdges}=req.body;
  try{
    const family=new familyschema({familyName, globalNodes, globalEdges});
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
module.exports = router;