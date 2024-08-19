const mongoose=require('mongoose')

const HeaderManagementSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('HeaderManagement', HeaderManagementSchema);