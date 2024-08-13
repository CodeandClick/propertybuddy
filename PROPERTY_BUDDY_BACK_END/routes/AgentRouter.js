import express from "express"
import agentController from "../controller/agentController.js"
const router = express()
import auth from "../middlewares/auth.js"


router.post("/register",agentController.register)




export default router;