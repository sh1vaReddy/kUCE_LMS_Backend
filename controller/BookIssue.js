const Book=require('../Models/Book')
const BookIssue=require('../Models/BookIssue')
const student_reg=require('../Models/Student_reg')
const  BookHistory=require("../Models/BookHistory.js");
const { response } = require('express');

exports.CreateBookIssue = async (req, res) => {
  try {
      const { BookId, Roll_No } = req.body;

      const book = await Book.findOne({ Book_ID: BookId });
      if (!book) {
          return res.status(404).json({
              success: false,
              message: "Book Not Found"
          });
      }

      if (book.No_Of_Books <= 0) {
          return res.status(404).json({
              success: false,
              message: "No Books Available"
          });
      }

      const student = await student_reg.findOne({ Roll_NO: Roll_No });
      console.log(student)
      if (!student) {
          return res.status(404).json({
              success: false,
              message: "Student Not Found"
          });
      }

      if (student.No_Of_cards < 4) {
          return res.status(400).json({
              success: false,
              message: "Cards Are Not Available"
          });
      }

      // Create BookHistory entry
      const bookhistory = await BookHistory.create({
          Book_Id: BookId,
          Book_Title: book.Book_Title,
          ROll_No:Roll_No,
          
      });

      const BookHistoryId = bookhistory._id;

      // Create BookIssue entry
      const bookIssue = await BookIssue.create({
          BookId: BookId,
          BookName:book.Book_Title,
          student: Roll_No,
          BookHistory: BookHistoryId,
      });

      // Update book details
      await Book.findOneAndUpdate(
          { Book_ID: BookId },
          { $inc: { No_Of_Books: -1 }, Status: "Borrowed" },
          { new: true }
      );

      // Update student details
      const updatedStudentDetails = await student_reg.findOneAndUpdate(
          { Roll_NO: Roll_No },
          { $inc: { No_Of_cards: -1 } },
          { new: true }
      );

      if (!updatedStudentDetails) {
          throw new Error("Failed to update student details.");
      }

      return res.status(201).json({
          success: true,
          message: "Book Issued",
      });

  } catch (error) {
      return res.status(400).json({
          success: false,
          message: error.message
      });
  }
};


exports.BookReturn = async (req, res) => {
  try {
      const { BookId, Roll_No } = req.body;

      const Book_Issue = await BookIssue.findOne({ BookId: BookId });
      const BookHistoryId = Book_Issue.BookHistory;

      if (!Book_Issue) {
          return res.status(404).json({
              success: false,
              message: "Book Issue Not Found"
          });
      }

      await BookIssue.findByIdAndDelete(Book_Issue._id);
      await Book.findOneAndUpdate({ Book_ID: BookId }, { $inc: { No_Of_Books: 1 } });
      await Book.findOneAndUpdate({ Book_ID: BookId }, { Status: "Available" }, { new: true });
      await student_reg.findOneAndUpdate({ Roll_NO: Roll_No }, { $inc: { No_Of_cards: 1 } });

      await BookHistory.findByIdAndUpdate(BookHistoryId, { return_Date: Date.now() }, { new: true });

      return res.status(200).json({
          message: "Successfully returned the book"
      });

  } catch (error) {
      return res.status(400).json({
          success: false,
          message: error.message
      });
  }
};


exports.BookHistory = async (req, res) => {
    try {
      const { Roll_NO } = req.body;
      const book = await BookIssue.find({ student: Roll_NO });
  
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "No Book Found"
        });
      }
  
      res.status(200).json({
        success: true,
        book
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "No Book Are Issued"
      });
    }
  }
  

  exports.Book_details=async(req,res)=>{
    try{
      const Book=await BookHistory.find()
    res.status(200).json({
        sucess:true,
        Book
    })
    }
    catch(error)
    {
        console.log(error.message)
    }
  }