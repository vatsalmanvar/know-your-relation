const mongoose=require('mongoose');
const {Schema} = mongoose;
const familySchema = new Schema({
    familyName:{type:String, required:true},
    globalNodes:{type:Array, required:true},
    globalEdges:{type:Array, required:true}
});

module.exports=mongoose.model('know your relation', familySchema);