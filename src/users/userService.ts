// import { DocumentDefinition} from 'mongoose';
import { HydratedDocument } from "mongoose";
import { UserModel, I_UserDocument } from "../db/usersModel";
import { error } from "console";
import bcrypt from "bcrypt";
import { I_ClubDocument } from "../db/clubModel";
import jwt from "jsonwebtoken";

export async function signUp(
  user: HydratedDocument<I_UserDocument>
): Promise<I_UserDocument>  {
 
  return await UserModel.create(user); 

}

export async function login(user: HydratedDocument<I_UserDocument>) {
    const foundUser = await UserModel.findOne({
      name: user.name,
    }).orFail(); // ORfail docs ?

    
    if(!bcrypt.compareSync(user.password, foundUser.password)) {
      throw new Error('Invalid data');
    }

    const token = jwt.sign(
      { _id: foundUser._id?.toString(), name: foundUser.name },
    'baconsausage',
      { expiresIn: "2days" }
    );

    return {foundUser, token}
}



// export async function join(club: HydratedDocument<I_ClubDocument>, membership: string, user: HydratedDocument<I_UserDocument>) {

// }