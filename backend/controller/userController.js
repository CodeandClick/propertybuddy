import UserDb from "../model/userModel.js";
import AgentDb from "../model/agentModel.js";
import {
  isEmailisExist,
  registerValidation,
  isverifyOtp,
  loginValidation,
  addressRegisterValidation,
} from "../services/userServices.js";
import argon2 from "argon2";
import generateToken from "../services/generateToken.js";
import { sendOPTVerificationEmail } from "../services/generateOtp.js";
import otpDb from "../model/otpModel.js";

const userRegister = async (req, res) => {
  console.log(process.env.ACCESS_TOKEN_PRIVAT_KEY);
  try {
    const { email, password, userName, role, confirmPassword } = req.body;
    //validate userbody
    const errors = await registerValidation(req.body);
    if (errors.length > 0) {
      console.log("coming here");
      return res.status(400).json({ error: true, message: errors[0] });
    }

    //checking is email is already exists
    const result = await isEmailisExist(email, "user");

    if (result) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedpassword = await argon2.hash(password);

    // If validation passes, proceed with user registration
    // Example: saving user to database
    const newUser = new UserDb({
      email,
      password: hashedpassword, // Note: you should hash the password before saving it
      userName,
      role,
    });

    console.log(newUser);
    const token = await generateToken(newUser);
    console.log(token);
    await newUser.save();
    req.session.Useremail = email;
    res.status(201).json({
      error: false,
      message: "User registered successfully.",
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const userAddressRegister = async (req, res) => {
  try {
    // const sessionEmail = req.session.Useremail;
    const { state, district, pinCode, place, email, phoneNumber } = req.body;
    const result = await addressRegisterValidation(req.body, res);
    if (result != false) {
      return;
    }

    const updateData = {
      state,
      district,
      place,
      pinCode,
      phoneNumber,
    };

    const data = await UserDb.updateOne({ email: email }, { $set: updateData });
    console.log(data);
    res.status(200).json({
      error: false,
      message: "success"
    });
    // res.status(200).json({error :false , message: 'Address is valid' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log("res",req.body);
    
    const { email, password } = req.body;
    const mailValid = await loginValidation(email);
    if (mailValid.error) {
      return res.status(400).json(mailValid);
    }

    //check is the email is user or agent
    const agent = await AgentDb.findOne({ email: email });
    const user = await UserDb.findOne({ email: email });

    console.log("agent :",agent);
    console.log("user :",user);
    
    
    if (agent) {
      //verify the password
      const result = await argon2.verify(agent.password, password);
      if (result) {
        const token = await generateToken(agent);
        res.status(201).json({
          error: false,
          message: "Agent logged in successfully.",
          role: "agent",
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
      } else {
        res.status(400).json({
          error: true,
          message: "password incorroct",
        });
      }
    } else if (user) {
    
      const result = await argon2.verify(user.password, password);
      console.log("resul ",result);

      
      if (result) {
        const token = await generateToken(user);
        console.log(token);
        console.log("hello");
        
        
        res.status(201).json({
          error: false,
          message: "User logged in successfully.",
          role: "user",
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
      }
    } else {
      res.status(400).json({
        error: true,
        message: "password incorroct",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "internel server error",
    });
  }
};

const getDetails = async (req, res) => {
  try {
    console.log("we have accessed successfully");
    res.status(200).json({
      error: false,
      message: "we have accessed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "server error",
    });
  }
};

const verifyMail = async (req, res) => {
  try {
    const { email, role } = req.body;
    const result = await isEmailisExist(email, role);
    console.log(result);
    if (result) {
      return res.status(400).json({
        error: true,
        message: "Email is already exists",
      });
    }

    const otpResult = await sendOPTVerificationEmail(email);
    if (otpResult.error) {
      return res.status(400).json(otpResult);
    }
    res.status(200).json(otpResult);
  } catch (error) {}
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    console.log(otp, email);
    const result = await isverifyOtp(email);
    if (result) {
      const otpResult = await argon2.verify(result.otp, otp);
      if (otpResult) {
        await otpDb.deleteOne({ userEmail: email });
        res.status(200).json({
          error: false,
          message: "otp successfully verified",
        });
      } else {
        res.status(400).json({
          error: true,
          message: "Invalid Otp",
        });
      }
    } else {
      res.status(403).json({
        error: true,
        message: "otp is expired please resent otp",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
};

export default {
  userRegister,
  login,
  getDetails,
  verifyMail,
  verifyOtp,
  userAddressRegister,
};
