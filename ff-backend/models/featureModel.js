const mongoose = require('mongoose')
const featureSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    isEnabled:{
        type:Boolean,
        default:false
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"organizations",
        required:true
    },
    createdBy:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{
    timestamps:true
})

const features = mongoose.model("features",featureSchema)
module.exports = features