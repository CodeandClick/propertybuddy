import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String ,
        required:true
    }
});

const UserDb = mongoose.model('User', userSchema);
const AgentDb = mongoose.model('Agent', userSchema);

export default {
    UserDb,
    AgentDb
};
