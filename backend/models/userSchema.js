const mongoose=require('mongoose');
const {Schema} = mongoose;
const bcrypt=require('bcryptjs');
const SECRET_KEY='thisisknowyourrelationprojectinmernstackbyvatsalandvishnu';
const userSchema = new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
});

userSchema.pre('save',async function(){
    if(this.isModified('password'))
    {
      this.password=await bcrypt.hash(this.password,12);
    }
  });
  module.exports=mongoose.model('user',userSchema);