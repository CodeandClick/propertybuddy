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
        console.log(email);
        const result=await otpDb.findOne({userEmail:email})
        return result
    }
    catch(error){
        console.log(error);
    }
    
}




export async function registerValidation(body,res){
    try {
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

    } catch (error) {
        console.log(error)
    }
}


export async function loginValidation(email){
     if(!email ||! validator.isEmail(email)){
        return {
            error:true ,
            message:"invalid email"
        }
     }
     return {
        error : false,
        message:'valid email'
     }
}



export async function addressRegisterValidation(details ,res){
    const { state, district, pinCode, place ,email , phoneNumber} = details

    // if(!email || !validator.isEmail(email) || sessionEmail != email){
    //     return res.status(400).json({error:true , message:"invalid email or email is incorrect"})
    // }

    if (!state || !validator.isAlpha(state.replace(/\s+/g, ''), 'en-IN', { ignore: ' ' })) {
        return res.status(400).json({error:true , message: 'Invalid state' });
    }
    if (!district || !validator.isAlpha(district.replace(/\s+/g, ''), 'en-IN', { ignore: ' ' })) {
        return res.status(400).json({error:true , message: 'Invalid district' });
    }

    if (!pinCode || !validator.isNumeric(pinCode.toString()) || pinCode.toString().length !== 6) {
        return res.status(400).json({error:true , message: 'Invalid pin code' });
    }

    if (!place || !validator.isAlpha(place.replace(/\s+/g, ''), 'en-IN', { ignore: ' ' })) {
        return res.status(400).json({error:true , message: 'Invalid place' });
    }
    console.log('address is valid')

    return false


    
}






