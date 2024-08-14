import validator from "validator";



export function adminLoginValidation(details , res){
    const {email , password} = details

    const errors = []

    if(!email && !password){
        errors.push('email and password is missing')
    }

    if(!email || !validator.isEmail(email)){
         errors.push('invalid email or email not found')
    }

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    if(errors.length > 0){
        return res.status(400).json({
            error:true ,
            message:errors[0]
        })
    }

    return false
      
}