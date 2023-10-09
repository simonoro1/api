import { Request, Response } from "express";
import * as userService from "./userService";
import jwt from "jsonwebtoken";
import { HydratedDocument } from 'mongoose';
import { I_UserDocument } from "../db/usersModel";

export const Userlogin = async (req: Request, res: Response) => {
  try {
    const foundUser = await userService.login(req.body); // Devuelve el usuario validado y el token creado

    res.status(200).send(foundUser)
  } catch (error: any) {
    throw new Error(error) 
  }
};

export const Usersignup = async (req: Request, res: Response) => {
  try {
    await userService.signUp(req.body);
    Userlogin(req, res)
    // res.status(200).send(user)
  } catch (error: any) {
    throw new Error(error)
  }
};


