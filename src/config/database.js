const mongoose = require("mongoose")


async function connectDb() {
   try{
await  mongoose.connect(process.env.MONGOOSE_URL)
console.log("mongoose connect")
   }catch(e){
    console.log("error", e)
   }
}
module.exports = connectDb