const mongoose = require('mongoose');

const StudentRegSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Enter Student Name"]
    },
    Roll_NO: {
        type: String,
        required: [true, "Enter Correct Roll_No"],
        minLength: [5, "Enter Correct Roll_NO"],
        maxLength: [12, "Enter Correct Roll_NO"],
        unique: true,
    },
    Branch: {
        type: String,
        required: [true, "Enter your Branch"]
    },
    Date_Of_admission: {
        type: Date,
        required: [true, "Enter your  Admission Year"],
        unique: false,
        default: Date.now()
    },
    No_Of_cards:{
        type:Number,
        default:4,
    },


})

const student_reg=mongoose.model("studentRegister",StudentRegSchema)

module.exports=student_reg;