const mongoose=require('mongoose');
const {Schema} = mongoose;
const familySchema = new Schema({
    familyName:{type: String, required:true},
    members:[
        {
            memberName:{type: String, required:true},
            id:{type:Number, required:true},
            x:{type:Number, required:true},
            y:{type:Number, required:true}
        }
    ]
});

module.exports=mongoose.model('know your relation', familySchema);