const mongoose=require('mongoose');
const {Schema} = mongoose;
const familySchema = new Schema({
    familyName:{type: String, required:true},
    //Nodes:{type:String,required:true},
    //Edges:{type:String,required:true}
});

module.exports=mongoose.model('know your relation', familySchema);