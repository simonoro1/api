import { Request, Response } from "express";
import * as userService from './userService'



export const Userlogin = async (req: Request, res: Response)  => {
    try {
        const foundUser = await userService.login(req.body); // userService function
        console.log('login')
    } catch (error) {
    }
}


export const Usersignup  = async (req: Request, res: Response) => {
    try {
        await userService.signUp(req.body); 
        console.log('signup')
    } catch (error) {
        
    }
}