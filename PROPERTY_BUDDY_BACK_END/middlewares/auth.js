import jwt from 'jsonwebtoken'


const auth = async (req,res, next) =>{
    const token = req.header('Authorization')
    console.log("Token :",token);
    
    if(!token){
        return res
        .status(403)
        .json({error:true , message : "Access Denied : No token provided "})
    }


    try {
        const tokenDetails = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_PRIVAT_KEY
        );
        req.user = tokenDetails
        next()
    } catch (error) {
        res.status(403)
        .json({error:true , message:"Access Denied : invalid token"})
    }
}


export default auth