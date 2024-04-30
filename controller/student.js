const Student=require('../Models/Student')
const Student_reg=require('../Models/Student_reg')

exports.CreateStudent=async(req,res)=>
{
    try{
        const{Roll_No,Student_Name,Branch}=req.body;
        const user = await Student.findOne({ Roll_No});

           if(user)
           {
             return res.status(400).json({
                meesage:true,
                error:"Student Alredy Exits"})
           }

        const student=await Student.insertMany({
            Roll_No,
            Student_Name,
            Branch
        })
        return res.status(200).json({
        message:true ,  
        student})
    }
    catch(error)
    {
        return res.status(500).json({
            message:false,
            Error:error.message
        })

    }
    
}


exports.student_Reg = async (req, res) => {
  const { Name, Roll_NO, Branch } = req.body;

  if (!Name || !Roll_NO || !Branch) {
    return res.status(400).json({ message: "All Fields Mandatory" });
  }

  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({ Roll_NO });
    if (existingStudent) {
      return res.status(409).json({ message: "Student Already Exists" });
    }

    // Create a new student record
    const newStudent = await Student_reg.create({
      Name,
      Roll_NO,
      Branch,
      Date_Of_admission: new Date() // Assuming Date_Of_admission is set to the current date
    });

    res.status(201).json({ success: true, message: "Student created successfully", newStudent });
  } catch (error) {
    console.error("Failed to create student:", error);
    return res.status(500).json({ message: "Failed To Create", error: error.message });
  }
};



exports.loginstudent = async (req, res) => {
  const { Roll_No } = req.body; 
  console.log(Roll_No)

  if (!Roll_No) {
    return res
      .status(400)
      .json({ message: "Please Enter Roll Number" });
  }

  try {
    const student = await Student_reg.findOne({ Roll_NO:Roll_No }); 

    if (!student) {
      return res.status(401).json({ message: "Invalid Roll Number" });
    }

    res.status(200).json({
      message:true,
      student
    })
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
