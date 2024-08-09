import mongoose, { Schema } from "mongoose";

const userTokenSchema = new mongoose.Schema({
    userId : {
        type:Schema.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required :true 
    },
    createdAt : {
        type:Date,
        default : Date.now,
        expires : 30*86400
    }

});

const TokenDb = mongoose.model("tokens",userTokenSchema)

export default TokenDb