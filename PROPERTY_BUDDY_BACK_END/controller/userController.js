import userModel from '../model/userModel.js';
import validator from 'validator';
import { isEmailisExist } from '../services/userServices.js';

const UserDb = userModel.UserDb
const AgentDb = userModel.AgentDb

const userRegister = async (req, res) => {
    console.log('here')
    try {
        const { email, password, userName, confirmPassword } = req.body;
        console.log(req.body)
        // Validation checks
        let errors = [];

        if (!email || !validator.isEmail(email)) {
            errors.push('Invalid email.');
        }

        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }


        if (!userName || validator.isEmpty(userName.trim())) {
            errors.push('user name is required.');
        }


        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await isEmailisExist(email , 'user')


        if(result){
           return res.status(409).json({ error: 'User already exists' });
        }

    
        // If validation passes, proceed with user registration
        // Example: saving user to database
        const newUser = new UserDb({
            email,
            password, // Note: you should hash the password before saving it
            userName
        });

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
