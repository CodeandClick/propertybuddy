import express from 'express'
import adminController from '../controller/adminController.js'
import adminAuth from '../middlewares/adminAuth.js'
const router = express()


router.post('/login',adminController.login)
router.get('/status',adminController.status)
router.get('/getUsers',adminAuth, adminController.getUsers)
router.get('/getAgents',adminAuth,adminController.getAgents)



export default router;