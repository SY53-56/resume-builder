const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const tokenBlackListToken = require("../models/blacklist.model")





const authMiddleware = async(req,res,next)=>{
    const token= req.cookies.token
    if(!token)return res.status(401).json({message:"token not provided"})
      
      const isTokenBlackListed = await tokenBlackListToken.findOne({token})
      if(isTokenBlackListed){
        return res.status(401).json({message:"token is blacklisted. please login again"})
      }
   try{
     const decode=  jwt.verify(token , process.env.JWT_SECRET)
    console.log("decode",decode)
     req.user = decode
     next()
   }catch(e){
    return res.status(401).json({message:`${e} invaild token`})
   }
}
module.exports = {
    authMiddleware
}