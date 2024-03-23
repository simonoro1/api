import { Request, Response } from "express";
import * as authService from "./authService";


export const login = async (req: Request, res: Response) => {
  try {
    const {foundUser, token} = await authService.login(req.body); // Devuelve el usuario validado y el token creado
    res.cookie('jwt', token, {httpOnly: true})

    res.status(200).send({
      succes: true,
      user: foundUser,
      token
    })
  } catch (error: any) {
    throw new Error(error) 
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const {newUser, token} = await authService.signUp(req.body);
    res.cookie('jwt', token, {httpOnly: true})
    
    console.log("User Created:", newUser);
    res.status(200).send({
      succes:true,
      user: newUser,
      token
    })
  } catch (error: any) {
    throw new Error(error)
  }
};
//Refresh Token


export const refreshToken = async (req: Request, res: Response) =>{

  try {
    const foundUser = res.locals.user
    const token = await authService.refreshToken(foundUser)
    res.status(200).send({
      foundUser,
      token
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

// Log Out

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', {maxAge: 1})
    res.status(200).send(
      {
        message: "loggged out"
      }
    )
  } catch (error: any) {
    throw new Error(error)
  }
};

