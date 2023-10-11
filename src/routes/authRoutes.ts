import { Router, Request, Response } from 'express';
import { login, signup} from '../auth/authController';
import {auth} from '../middleware/auth';

const router = Router();


//Post Method
router.post('/login', login)

router.post('/register', signup)

router.get('/getAll', auth, (req: Request, res: Response) => {
    const user = res.locals.user
    res.send(user)
})

// router.get('/:me', auth, U )
// router.post('/myClub', auth, checkUser, myClub)
// //Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })



export default router;