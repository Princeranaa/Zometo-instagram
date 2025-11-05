const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const isExisting = await userModel.findOne({ email });

    if (isExisting) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);

    res.status(201).json({ message: "User registered successfully", 
    user:{
        id: user._id,
        fullName: user.fullName,
        email: user.email
      },
    token });

} catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in registering user", error: error.message });
  }
};  

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({message:"invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).json({message:"invalid credentials"});
        }

          const token = jwt.sign({
            id: user._id,
          },
          process.env.JWT_SECRET
        )

        res.cookie("token", token);
        res.status(200).json({
            message: "User logged in successfully", 
            user:{
                id: user._id,
                fullName: user.fullName,
                email: user.email
            },
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error in logging in user", error: error.message});
    }

}

exports.logoutUser = async (req,res)=>{
  res.clearCookie("token");
  res.status(200).json({message:"User logged out successfully"});
}

