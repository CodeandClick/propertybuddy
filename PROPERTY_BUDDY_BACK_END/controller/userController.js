import userModel from '../model/userModel.js';
import validator from 'validator';
import { isEmailisExist } from '../services/userServices.js';
import argon2 from 'argon2'

const UserDb = userModel.UserDb
const AgentDb = userModel.AgentDb

const userRegister = async (req, res) => {
    console.log('sinann')
    try {
        console.log(req.body)
        const { email, password, userName,role, confirmPassword } = req.body;


        // Validation checks
        let errors = [];

        if (!email || !validator.isEmail(email)) {
            errors.push('Invalid email.');
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

        if (errors.length > 0) {
            return res.status(400).json({ errors });
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
            role

        });

        console.log(newUser);
        

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




export default {
    userRegister
};
