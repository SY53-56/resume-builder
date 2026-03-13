const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{type:String, required:[true ,"token is re"]}
},{
    timestamps:true
}
)

const tokenBlackListToken = mongoose.model("blackListToken" , blacklistTokenSchema)

module.exports = tokenBlackListToken