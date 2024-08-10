import mongoose from "mongoose";
const Schema = mongoose.Schema;


const otpVerificationSchema = new Schema({
    userId:String ,
    otp: String ,
    createdAt :Date,
    
})