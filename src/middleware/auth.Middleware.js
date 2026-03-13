const jwt = require("jsonwebtoken")





const authMiddleware = async(req,res,next)=>{
    const token= req.cookies.token
    if(!token)return res.status(401).json({message:"token not provided"})
console.log("toekn",token)
     console.log("decpde", process.env.JWT_SECRET)
   try{
     const decode=  jwt.verify(token , process.env.JWT_SECRET)
     console.log("decpde", process.env.JWT_SECRET)
     req.user = decode
     next()
   }catch(e){
    return res.status(401).json({message:`${e} invaild token`})
   }
}
module.exports = {
    authMiddleware
}