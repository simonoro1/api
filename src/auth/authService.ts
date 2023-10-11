// import { DocumentDefinition} from 'mongoose';
const dotenv = require('dotenv').config()

import { HydratedDocument } from "mongoose";
import { UserModel, I_UserDocument } from "../db/usersModel";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email";


export const SECRET_KEY: string = (process.env.SECRET_KEY as string);

 function createToken(foundUser: HydratedDocument<I_UserDocument>){
   const token = jwt.sign({_id: foundUser._id?.toString(), name: foundUser.name}, SECRET_KEY, {expiresIn: "2days"} )
   return token
 }


export async function signUp(
  user: HydratedDocument<I_UserDocument>
)  {

  const newUser = new UserModel(user)
  await newUser.save(); 

  const token = createToken(newUser)

  sendVerificationEmail(newUser.email, token)

  return newUser
 
}

export async function login(user: HydratedDocument<I_UserDocument>) {
    const foundUser = await UserModel.findOne({
      name: user.name,
    }).orFail(); // ORfail docs ?

    
    if(!bcrypt.compareSync(user.password, foundUser.password)) {
      throw new Error('Invalid data');
    }

    // const token = jwt.sign(
    //   { _id: foundUser._id?.toString(), name: foundUser.name },
    // 'baconsausage',
    //   { expiresIn: "2days" }
    const token = createToken(foundUser)
    

    return {foundUser, token}
}



// export async function join(club: HydratedDocument<I_ClubDocument>, membership: string, user: HydratedDocument<I_UserDocument>) {

// }