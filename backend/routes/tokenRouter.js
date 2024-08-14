import { Router } from "express";
const router = Router()
import tokenController from "../controller/tokenController.js";


router.post('/verifyRefreshToken',tokenController.verifyRefreshTokenRouter)



export default router