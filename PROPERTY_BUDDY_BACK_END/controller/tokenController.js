import TokenDb from "../model/userToken.js";
import jwt from 'jsonwebtoken'
import verifyRefreshToken from "../services/verifyRefreshToken.js";



const verifyRefreshTokenRouter = (req,res)=>{

    try {
        const {refreshToken} = req.body
        if(!refreshToken){
            return res.status(400).json({error:"refreshToken is missing "})
        }

        verifyRefreshToken(refreshToken).then(({tokenDetails})=>{
            const payload = {_id : tokenDetails._id , userName:tokenDetails.userName}
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVAT_KEY,
                {expiresIn:'14m'}
            )

            res.status(200).json({
                accessToken,
                message:"access token created successfully"
            })
        })
    } catch (error) {
        
    }
}


export default {
    verifyRefreshTokenRouter
}