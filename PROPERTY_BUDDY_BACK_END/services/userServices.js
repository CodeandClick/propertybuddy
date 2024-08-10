import otpDb from "../model/otpModel.js";
import userModel from "../model/userModel.js";
import validator from "validator";
const UserDb = userModel.UserDb
const AgentDb = userModel.AgentDb


export async function isEmailisExist( email , role ){
    try {
        if(role == 'user'){
            const result = await UserDb.findOne({ email:email})
            return result
        }else{
            const result = await AgentDb.findOne({ email : email })
            return result
        }
    } catch (error) {
        console.log(error)
    }
}
export async function isverifyOtp(email) {
    try{
        console.log(otp,email);
        
        const result=await otpDb.findOne({userEmail:email})
        return result
    }
    catch{
        console.log(error);
        
    }
    
}




export async function registerValidation(body){

        const { email, password, userName,role, confirmPassword } = body;
        
        // Validation checks
        let errors = [];
        
        if(!email || !validator.isEmail(email)){
            errors.push('invalid email or email not found')
        }

         if (!userName || validator.isEmpty(userName.trim())) {
            errors.push('user name is required.');
        }

        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }

        return errors

}






