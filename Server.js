const express=require('express')
const server=express()
const PORT=8000
const conconectdb=require('./config/db')
const Studentrouter=require('./routes/Student')
const Bookrouter=require('./routes/Book')
const BookIssue=require('./routes/BookIssue')
const cors = require("cors");
const dotenv = require('dotenv')

dotenv.config()

server.use(cors())

server.use(express.json())
server.use("/api/v1",Studentrouter,Bookrouter,BookIssue)
conconectdb()
server.listen(process.env.PORT,()=>{
    console.log(`Server is running ${PORT}`)
})