import { Request, Response } from "express";
import * as authService from "./authService";


export const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await authService.login(req.body); // Devuelve el usuario validado y el token creado

    res.status(200).send(foundUser)
  } catch (error: any) {
    throw new Error(error) 
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    await authService.signUp(req.body);
    login(req, res)
    // res.status(200).send(user)
  } catch (error: any) {
    throw new Error(error)
  }
};


// Log Out
// Method particular document , function Whole model  