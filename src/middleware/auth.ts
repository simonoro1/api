import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../db/usersModel";

export const SECRET_KEY: Secret = "baconsausage";

export interface decodedPayload {
  _id : string,
  name: string,
  iat: number,
  exp: number
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (!token) {
      throw new Error();
    }

    const decoded: any  = jwt.verify(token, SECRET_KEY);
    const foundUser = await UserModel.findById(decoded._id).orFail();

    res.locals.user = foundUser
    next();
};

