import userModel from '../model/userModel.js';
import validator from 'validator';
import { isEmailisExist ,registerValidation} from '../services/userServices.js';
import argon2 from 'argon2'
import generateToken from '../services/generateToken.js';
import { sendOPTVerificationEmail } from '../services/generateOtp.js';

const UserDb = userModel.UserDb
const AgentDb = userModel.AgentDb

const userRegister = async (req, res) => {
    console.log(process.env.ACCESS_TOKEN_PRIVAT_KEY)
    try {
        console.log(req.body)
        const { email, password, userName, confirmPassword } = req.body;
        //validate userbody
        const errors = await registerValidation(req.body)
        if ( errors.length > 0) {
            console.log('coming here')
            return res.status(400).json({ error: errors });
        }


        const result = await isEmailisExist(email , 'user')



        if(result){
           return res.status(409).json({ error: 'User already exists' });
        }

        const hashedpassword = await argon2.hash(password)
    
        // If validation passes, proceed with user registration
        // Example: saving user to database
        const newUser = new UserDb({
            email,
            password: hashedpassword, // Note: you should hash the password before saving it
            userName,
        });

        console.log(newUser);
        const token  = await generateToken(newUser)
        console.log(token)
        await newUser.save()
        res.status(201).json({
             message: 'User registered successfully.',
             accessToken : token.accessToken,
             refreshToken : token.refreshToken
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' ,error:error });
    }
};



const login = async (req , res)=>{
     try {
        const {email , password} = req.body
        
        const errors = []

        if(!email || validator.isEmail(email)){
            errors.push('invalid email')
        }
     } catch (error) {
        
     }
}


const getDetails = async (req,res)=>{
    try {
        console.log('we have accessed successfully')
        res.status(200).json({
            error:false,
            message:'we have accessed successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true ,
            message:"server error"
        })

    }
}



const verifyMail = async (req,res)=>{
    try {
        const {email , role} = req.body
        const result =await isEmailisExist(email,role)
        console.log(result)
        if(result){
           return res.status(403).json({
                error:true ,
                message:'Email is already exists'
            })
        }

       const otpResult = await sendOPTVerificationEmail(email)
        if(otpResult.error){
           return res.status(400).json(otpResult)
        }
        res.status(200).json(otpResult)
    } catch (error) {
        
    }
}



export default {
    userRegister,
    login,
    getDetails,
    verifyMail
};
