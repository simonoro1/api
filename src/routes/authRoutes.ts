import { Router, Request, Response } from 'express';
import { login, logout, refreshToken, signup} from '../auth/authController';
import {auth} from '../middleware/auth';

const router = Router();


//Post Method
router.post('/login', login)

router.post('/register', signup)

router.get('/logout', logout)


router.get('/check', auth, (req: Request, res: Response) => {
    res.status(200).send( res.locals.user )
})

router.get('/refresh',auth, refreshToken)



export default router;