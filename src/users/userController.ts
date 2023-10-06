import { Request, Response } from "express";
import * as userService from "./userService";
import jwt from "jsonwebtoken";

export const Userlogin = async (req: Request, res: Response) => {
  try {
    const foundUser = await userService.login(req.body); // userService function
    const token = jwt.sign(
      { _id: foundUser._id?.toString(), name: foundUser.name },
    'baconsausage',
      { expiresIn: "2days" }
    );
    console.log(foundUser, token);
    res.status(200).send({ foundUser, token });
  } catch (error) {
    res.status(500).send(error); //Error Managment
  }
};

export const Usersignup = async (req: Request, res: Response) => {
  try {
    await userService.signUp(req.body);
    Userlogin(req, res)
    // res.status(200).send(user)
  } catch (error) {}
};

export const myClub = async (req: Request, res: Response) => {
  try {
    console.log('autorizado')
    // const user = await userService.myClub(req.body, req.headers);
    res.status(200).send("hola")
  } catch (error) {
    res.status(500).send(error)
  }
};
