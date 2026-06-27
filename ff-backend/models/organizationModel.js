const mongoose = require('mongoose')
const organizationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
},
    {
        timestamps : true
    
})
const organizations = mongoose.model("organizations",organizationSchema)
module.exports = organizations