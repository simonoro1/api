import { Router, Request, Response } from 'express';
import { login, logout, refreshToken, signup} from '../auth/authController';
import {auth} from '../middleware/auth';

const router = Router();


//Post Method
router.post('/login', login)

router.post('/register', signup)

router.get('/logout', logout)

router.get('/refresh', refreshToken)





export default router;