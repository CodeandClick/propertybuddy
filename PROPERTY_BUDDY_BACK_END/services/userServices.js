import userModel from "../model/userModel.js";
const UserDb = userModel.UserDb
const AgentDb = userModel.AgentDb

export async function isEmailisExist( email , role ){
    try {
        if(role == 'user'){
            const result = await UserDb.findOne({ email:email})
            return result
        }else{
            const result = await AgentDb.findOne({ email : email })
            return result
        }
    } catch (error) {
        
    }
}






