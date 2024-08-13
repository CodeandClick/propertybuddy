import  argon2  from 'argon2';
import AgentDb from '../model/agentModel.js';
import { agentAddressValidation } from '../services/agentServices.js';
import generateToken from '../services/generateToken.js';
import { isEmailisExist, registerValidation } from '../services/userServices.js';
import { sendOPTVerificationEmail } from '../services/generateOtp.js';
import otpDb from '../model/otpModel.js';
import UserDb from '../model/userModel.js';







const register = async (req, res) => {
    console.log(process.env.ACCESS_TOKEN_PRIVAT_KEY)
    try {
        console.log(req.body)
        const { email, password, userName, confirmPassword } = req.body;
        //validate userbody
        const errors = await registerValidation(req.body)
        if ( errors.length > 0) {
            console.log('coming here')
            return res.status(400).json({ error: true , message:errors[0] });
        }

        //checking is email is already exists
        const result = await isEmailisExist(email , 'agent')
        
        if(result){
           return res.status(409).json({ error: 'User already exists' });
        }

        const hashedpassword = await argon2.hash(password)
    
        // If validation passes, proceed with user registration
        // Example: saving user to database
        const newUser = new AgentDb({
            email,
            password: hashedpassword, // Note: you should hash the password before saving it
            userName,
        });

        console.log(newUser);
        const token  = await generateToken(newUser)
        console.log(token)
        await newUser.save()
        req.session.Useremail = email
        res.status(201).json({
             error:false,
             message: 'User registered successfully.',
             accessToken : token.accessToken,
             refreshToken : token.refreshToken
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' , error : error });
    }
};



const agentAddressRegister = async (req, res) => {
    try {
        // const sessionEmail = req.session.Useremail;
        const { state, district, pinCode, place ,email , phoneNumber , companyName} = req.body;
        const result = await agentAddressValidation(req.body , res)
        if(result){
            return 
        }

        const updateData = {
            state,
            district,
            place,
            pinCode,
            phoneNumber
        }

        const data = await AgentDb.updateOne({email:email},{$set:updateData})
        if(data.modifiedCount > 0){
            return res.status(200).json({
                error:false,
                message:"Agent Details Added Successfully"
            })
        }
        console.log(data)
    
        res.status(400).json({error :true , message: 'provided email is not exist'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error : true , message: 'Server error' });
    }
};




    


export default {
    agentAddressRegister,
    register
}


