const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        required:true,
        type:String
    },
     email: {
        required:true,
        type:String,
        unique: true
    },
    password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"organizations",
        
    }
},
{
    timestamps:true

})
const users = mongoose.model("users",userSchema)
module.exports = users