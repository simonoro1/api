import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../db/usersModel";



export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (!token) {
      throw new Error('Token does not exist!');
    }
    
    next();
};

