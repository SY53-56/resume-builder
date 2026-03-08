const userModel = require("../models/user.model")

const bcrypt = require("bcrypt")
const  jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

const registerController =async (req, res)=>{
try{
  const {email , username , password} = req.body
 if(!email || !username || !password) return res.status(400).json({message:"please provide"})
  const isUser = await userModel.findOne({ $or:[{username} , {email}]})
  if(isUser) return  res.status(400).json({ message:"email is already exists"})
 
    const hashPassword = await bcrypt.hash(password ,10)
    
    const user = await userModel.create({
        username,
        email,
        password:hashPassword
    })

    const token = jwt.sign({id:user._id, username:user.username} , process.env.JWT_SECRET)
     res.cookie("token", token)
   res.status(201).json({message:"user registered successful" , user:{
    id:user._id,
    username:user.username,
    email:user.email
   }})
}catch(e){
res.status(400).json({message:`${e} error`})
}
}

const loginController = async(req,res)=>{
try{
    const {email, password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({mesaage:"email is not register "})
    }

    const isMathcPassword= await bcrypt.compare(password , user.password)
    if(!isMathcPassword) return res.status(401).json({message:"password is not match"})
 
          const token = jwt.sign({id:user._id, username:user.username} , process.env.JWT_SECRET)
    res.cookie("token", token)
  res.status(200).json({message:"user login successfully",user:{
    id:user._id,
    username:user.username,
    email:user.email
  }})
}catch(e){
     res.status(400).json({message:`${e} error`})
}

}

module.exports={
    loginController,
    registerController
}