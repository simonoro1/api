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

    const decoded = jwt.verify(token, SECRET_KEY);

    (req as CustomRequest).token = decoded; // ?????

    console.log(decoded);
    next();
};

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded: any = jwt.verify(token, SECRET_KEY); // arreglar any
    // (req as CustomRequest).token = decoded
    const foundUser = await UserModel.findById(decoded._id).orFail();
    res.locals.user = foundUser;
    console.log(foundUser)
    next();
  } catch (error) {
    console.log(error);
    res.locals.user = null;
    next();
  }
};
