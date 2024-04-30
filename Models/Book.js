const mongoose=require("mongoose")

const BookSchema=new mongoose.Schema({
    Book_ID:{
        type:Number,
        required:true,
        unique: true
    },
    Book_Title:{
        type:String,
        required:true,
    },
    Author_Name:{
        type:String,
        require:[true,"Enter Author Name"]
    },
    Edition:{
        type:String,
        required:true,
    },
    pages:{
        type:String,
        required:true,
    },
    cost:{
        type:String,
        required:true,
    },
    Name_Of_Supplier:{
        type:String,
        required:true,
    },
    No_Of_Books:{
        type:Number,
        required:true,
    },
    Status:{
        type:"String",
        required:true,
        default:"Available"
    }

},{
    timestamps: true
}
)

const Books=mongoose.model("Books",BookSchema)

module.exports=Books;