
const mongoose =require('mongoose')

const ConnectDb= ()=>{
    mongoose.connect(process.env.monogo_url).then(()=>{
  console.log("Database Sucessfuly Connected")  
}).catch((error)=>{
    console.log(error)
})
}

module.exports=ConnectDb