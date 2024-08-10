import mongoose from "mongoose";
const Schema = mongoose.Schema;


const otpVerificationSchema = new Schema({
    userEmail:String ,
    otp: String ,
    createdAt :Date,
    expiresAt: Date
})

const otpDb = mongoose.model(
    "OtpDb",
    otpVerificationSchema
)   


export default otpDb;