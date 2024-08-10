import userModel from '../model/userModel.js';
import validator from 'validator';
import { isEmailisExist ,registerValidation} from '../services/userServices.js';
import argon2 from 'argon2'

const UserDb = userModel.UserDb
const AgentDb = userModel.AgentDb

const userRegister = async (req, res) => {
    
    try {
        
        const { email, password, userName, confirmPassword } = req.body;
        //validate userbody
        const errors = registerValidation(req.body)

        if (errors.length > 0) {
            return res.status(409).json({errors})
            
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
            userName

        });

        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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
