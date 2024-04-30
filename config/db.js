
const mongoose =require('mongoose')

const ConnectDb= ()=>{
    mongoose.connect('mongodb+srv://kanagaddashivareddy:TUolfScrIbApU7EE@cluster0.pxr3h58.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
  console.log("Database Sucessfuly Connected")  
}).catch((error)=>{
    console.log(error)
})
}

module.exports=ConnectDb