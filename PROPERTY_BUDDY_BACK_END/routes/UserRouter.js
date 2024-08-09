import express from "express"
import userController from "../controller/userController.js"
const router = express()



router.post('/register', userController.userRegister)
router.post('/login',userController.login)



export default router
 