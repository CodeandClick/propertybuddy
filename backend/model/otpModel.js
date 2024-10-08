import mongoose from 'mongoose';

const otpVerificationSchema = new mongoose.Schema({
  userEmail: String,
  otp: String,
  createdAt: { type: Date},
  expiresAt: { type: Date} 
});

// Pre-save hook to set expiresAt
otpVerificationSchema.pre('save', function(next) {
    this.createdAt =new Date(Date.now())
    this.expiresAt = new Date(Date.now() + 1 * 60 * 1000); 
    next();
  });  

const OtpVerification = mongoose.model('OtpVerification', otpVerificationSchema);

export default OtpVerification;



