import { Router, Request, Response } from 'express';
import { login, signup} from '../auth/authController';
import {auth} from '../middleware/auth';

const router = Router();


//Post Method
router.post('/login', login)

router.post('/register', signup)

router.get('/check', auth, (req: Request, res: Response) => {
    res.status(200).send( res.locals.user )
})




export default router;