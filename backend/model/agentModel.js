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
        phoneNumber:String,
        companyName:String,
        district:String,
        state: String,
        pinCode: Number,    
        place:String
        
    });
const AgentDb = mongoose.model('Agent', agentSchema);

export default AgentDb
