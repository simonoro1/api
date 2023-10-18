// import { DocumentDefinition} from 'mongoose';
const dotenv = require("dotenv").config();

import { HydratedDocument } from "mongoose";
import { UserModel, I_UserDocument } from "../db/usersModel";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email";

export const SECRET_KEY: string = process.env.SECRET_KEY as string;

function createToken(foundUser: HydratedDocument<I_UserDocument>) {
  const token = jwt.sign(
    { _id: foundUser._id?.toString(), name: foundUser.name },
    SECRET_KEY,
    { expiresIn: "1m" }
  );
  return token;
}



export async function signUp(user: HydratedDocument<I_UserDocument>) {
  const newUser = new UserModel(user);
  await newUser.save();

  const token = createToken(newUser);

  // sendVerificationEmail(newUser.email, token) // catch error ?;

  return newUser;
}

export async function login(user: HydratedDocument<I_UserDocument>) {
  const foundUser = await UserModel.findOne({
    name: user.name,
  }).orFail();

  if (!bcrypt.compareSync(user.password, foundUser.password)) {
    throw new Error("Invalid data");
  }

  const token = createToken(foundUser);

  return {foundUser , token };
}


export async function refreshToken( foundUser: HydratedDocument<I_UserDocument>) {
  
  const token = createToken(foundUser)
  return token
}  