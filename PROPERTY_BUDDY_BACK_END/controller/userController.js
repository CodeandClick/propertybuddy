import userModel from '../model/userModel.js';
import validator from 'validator';
import { isEmailisExist ,registerValidation} from '../services/userServices.js';
import argon2 from 'argon2'
import generateToken from '../services/generateToken.js';

const UserDb = userModel.UserDb
const AgentDb = userModel.AgentDb

const userRegister = async (req, res) => {
    console.log(process.env.ACCESS_TOKEN_PRIVAT_KEY)
    try {
        const { email, password, userName,role, confirmPassword } = req.body;
        //validate userbody
        registerValidation(req.body,res)

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
            role

        });

        console.log(newUser);
        

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });

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



export default {
    userRegister,
    login
};
