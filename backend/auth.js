const express = require('express');
const f = require('./db');
const router = express.Router()
// const db = require('./db'); 

router.post('/',async (req,res)=>{
    const {family}=req.body;
    const t= await f.run(family)
    if(t){
        return res.send({msg:'found'})
    }
    else{
        return res.send({msg:' not found'})
        
    }
    
});
module.exports=router;