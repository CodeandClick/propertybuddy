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
        },
        place: String,
        pinCode:Number,
        state:String ,
        district:String,
        active : {
            type : Boolean
        },
        phoneNumber:String,
        district:String,
        state: String,
        pincode: Number,
        place:String
    });

const UserDb = mongoose.model('User', userSchema);

export default UserDb
