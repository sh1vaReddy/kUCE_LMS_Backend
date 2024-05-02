const express = require('express');
const router = express.Router();
const BookIssues = require('../controller/BookIssue');

router.post("/bookissue",BookIssues.CreateBookIssue);
router.post("/return",BookIssues.BookReturn)
router.post("/history",BookIssues.BookHistory)
router.get("/book/details",BookIssues.Book_details)
router.post("/book/details/rollno",BookIssues.Bookhistorybyrollno)

module.exports=router;