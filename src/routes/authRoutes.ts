import { Router, Request, Response } from 'express';
import { login, signup} from '../auth/authController';
import {auth} from '../middleware/auth';

const router = Router();


//Post Method
router.post('/login', login)

router.post('/register', signup)

router.get('/getAll', auth, (req: Request, res: Response) => {
    // const user = res.locals.user
    res.send(req.cookies)
})




export default router;