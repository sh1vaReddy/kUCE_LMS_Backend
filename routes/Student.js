const express=require('express')
const router=express.Router()
const student=require('../controller/student')

router.post("/create",student.CreateStudent)
router.post("/register",student.student_Reg)
router.post("/login",student.loginstudent)

module.exports=router;