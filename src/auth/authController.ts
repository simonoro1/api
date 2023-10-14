import { Request, Response } from "express";
import * as authService from "./authService";


export const login = async (req: Request, res: Response) => {
  try {
    const {foundUser, token} = await authService.login(req.body); // Devuelve el usuario validado y el token creado
    res.cookie('jwt', token, {httpOnly: false})

    res.status(200).send({
      succes: true,
      user: foundUser._id
    })
  } catch (error: any) {
    throw new Error(error) 
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.signUp(req.body);
    res.status(200).send({
      succes: true,
      user
    })
  } catch (error: any) {
    throw new Error(error)
  }
};


// Log Out
