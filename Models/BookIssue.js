const mongoose = require('mongoose');

const BookIssueschema = new mongoose.Schema({
    BookId: {
        type: String, 
        required: true,
    },
    BookName:{
        type:String,
        required:true,
    },
    student:{
        type:String,
        required:true,
    },
    Date_of_Issue: {
        type: Date,
        required: true,
        default: Date.now,
    },
    Date_of_Return: {
        type: Date,
        required: true,
        default: function () {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 7);
            return returnDate;
        },
    },
    BookHistory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"BookHistory",
        required:true,
    }
});

const BookIssue = mongoose.model("BookIssue", BookIssueschema);

module.exports = BookIssue;
