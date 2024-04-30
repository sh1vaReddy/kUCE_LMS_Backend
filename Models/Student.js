const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Roll_No: {
        type: String,
        required: true,
        unique:true,
        match: [
            /^17\d{2}-\d{3,5}(?:L)??$/,
            'Roll_No must match the pattern ^17\\d{2}-\\d{3,5}$'
        ],
        minLength: [8, "Enter Correct Roll_NO"],
        maxLength: [12, "Enter Correct Roll_NO"],
      
    },
    Student_Name: {
        type: String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
        enum: ['MIN', 'CSE', 'EEE', 'ECE', 'IT'],
        message: '{VALUE} is not a valid Branch',
        minLength: 2,
        maxLength: 3,
    },
    Status: {
        type: String,
        required: true,
        enum: ['Active', 'NotActive'],
        default: 'Active',
    }
}, {
    timestamps: true
});

const StudentModel = mongoose.model("Students", studentSchema);

module.exports = StudentModel;
