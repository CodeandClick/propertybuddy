import express from "express"
import agentController from "../controller/agentController.js"
const router = express()
import auth from "../middlewares/auth.js"
import userController from "../controller/userController.js"


router.post("/register",agentController.register)
router.post('/verifyMail',userController.verifyMail)
router.post('/verifyOtp',userController.verifyOtp)



router.put('/agentAddressRegister', agentController.agentAddressRegister)

export default router