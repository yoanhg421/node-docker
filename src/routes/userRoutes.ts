import { Router } from 'express'
import { signUp, login, logout } from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.route('/signup').post(signUp)

router.route('/login').post(login)

router.route('/logout').post(protect, logout)

export const userRouter = router
