const express=require('express');
const router=express.Router();
const Books=require('../controller/Book')

router.post("/createBooks",Books.CreateBook)
router.get('/getBooks',Books.getallbooks)
router.put("/deleteBooks",Books.deletebook)
router.post("/book",Books.getsinglebook)


module.exports=router;