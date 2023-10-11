import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../db/usersModel";

export const SECRET_KEY: Secret = "baconsausage";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded: any = jwt.verify(token, SECRET_KEY);
    const foundUser = await UserModel.findById(decoded._id).orFail();
    // (req as CustomRequest).token = decoded; 
    res.locals.user = foundUser

    next();
};

