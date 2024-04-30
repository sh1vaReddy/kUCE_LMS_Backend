const mongoose=require('mongoose')


const BookReturnScema=new mongoose.Schema({
    Book_Id:{
        type:Number,
        required:true,
    },
    Book_Title:{
        type:String,
        required:true,
    },
    Roll_no:{
        type:String,
        required:true,
    },
    Branch:
    {
        type:String,
        required:true,
    },
    Return_Date:{
        type:Date,
        required:true,
        default:Date.now(),
    }
})

const BookReturn=mongoose.model("Bookreturn",BookReturnScema)

module.exports=BookReturn;

