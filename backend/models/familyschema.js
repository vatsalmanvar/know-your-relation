const mongoose=require('mongoose');
const {Schema} = mongoose;
const bcrypt=require('bcryptjs');
const SECRET_KEY='thisisknowyourrelationprojectinmernstackbyvatsalandvishnu';
const familySchema = new Schema({
    familyName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    globalNodes:{type:Array, required:true},
    globalEdges:{type:Array, required:true},
    tokens:[
        {
          token:{
            type:String,required:true
          },
        }
      ]
});
  
module.exports=mongoose.model('know your relation', familySchema);