import validator from "validator"
import { adminLoginValidation } from "../services/adminServices.js";
import UserDb from "../model/userModel.js";
import AgentDb from "../model/agentModel.js";



const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);   
      const isEmail = process.env.ADMIN_EMAIL;
      const isPassword = process.env.ADMIN_PASSWORD;
  
      if (email !== isEmail) { 
        return res.status(400).json({ error: true, message: 'email is incorrect' });
      } 
       
      if (password !== isPassword) {
        return res.status(400).json({ error: true, message: 'password is incorrect' });
      }
       
      req.session.isAdmin = true;
      res.status(200).json({ error: false, message: 'admin logged in successfully' });
       
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'internal Server Error' });
    }
  };


const getUsers = async (req,res)=>{
    try {   
      const users = await UserDb.find()
      res.status(200).json({
        error:false,
        message:"Users Fetched Successfully",
        data:users
      })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:false,
            message:"internel server error"
        })
    }
}



const getAgents = async (req,res)=>{
    try {   
      const agents = await AgentDb.find()
      res.status(200).json({
        error:false,
        message:"Agents Fetched Successfully",
        data:agents
      })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:false,
            message:"internel server error"
        })
    }
}





export default {
    login,
    getUsers,
    getAgents
}