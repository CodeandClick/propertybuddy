import mongoose from 'mongoose';

    const agentSchema = new mongoose.Schema({
        userName:String,
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String ,
            required:true
        },
        active : {
            type : Boolean
        },
        companyName:String,
        district:String,
        state: String,
        pincode: Number,
        place:String
        
    });
const AgentDb = mongoose.model('Agent', userSchema);

export default {
    AgentDb
};
