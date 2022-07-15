const express = require("express");
const f = require("./db");
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
  }catch(err){
    console.log(err);
  }
})
router.post('/viewFamilyTree',(req,res)=>{
  res.send({msg:"view tree"})
  console.log("view tree")
})
module.exports = router;
