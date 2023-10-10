import { Router, Request, Response } from 'express';
import { Userlogin, Usersignup} from '../users/userController';
import { CustomRequest, auth, checkUser } from '../middleware/auth';

const router = Router();


//Post Method
router.post('/login', Userlogin)

router.post('/register', Usersignup)

router.get('/getAll', auth, (req : any, res) => {
    const token = req.token

    res.send(token)
})

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