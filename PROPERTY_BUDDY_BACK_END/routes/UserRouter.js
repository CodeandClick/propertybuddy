import express from "express"
import userController from "../controller/userController.js"
const router = express()
import auth from "../middlewares/auth.js"


router.post('/register', userController.userRegister)
router.post('/login',userController.login)
router.post('/verifyMail',userController.verifyMail)
router.post('/verifyOtp',userController.verifyOtp)
router.put('/userAddressRegister', auth , userController.userAddressRegister)



router.get('/getDetails',auth,userController.getDetails)



export default router
 