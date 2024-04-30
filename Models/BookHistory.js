const mongoose=require('mongoose')

const BookHistoryScema=new mongoose.Schema({
    Book_Id:{
        type:Number,
        required:true
    },
    Book_Title:{
        type:String,
        required:true,
    },
    ROll_No:{
        type:String,
        required:true,
    },
    Issue_Date:{
        type:Date,
        default:Date.now()
    },
    Excepted_Date:{
        type:Date,
        default:Date.now()+15*24*60*60*1000,
    },
    return_Date:{
        type:Date,
        required:true,
        default:Date.now()+15*24*60*60*1000,
    }
})


const BookHistory=mongoose.model("BookHistory",BookHistoryScema)

module.exports=BookHistory;