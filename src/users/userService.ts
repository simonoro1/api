// import { DocumentDefinition} from 'mongoose';
import { HydratedDocument } from "mongoose";
import { UserModel, I_UserDocument } from "./usersModel";
import { error } from "console";
import bcrypt from "bcrypt";

export async function signUp(
  user: HydratedDocument<I_UserDocument>
): Promise<void> {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: HydratedDocument<I_UserDocument>) {
  try {
    const foundUser = await UserModel.findOne({
      name: user.name,
    }).orFail(); // ORfail docs ?

    if(!bcrypt.compareSync(user.password, foundUser.password)) {
      throw error
    }

    return foundUser
  } catch (error) {
    throw error;  
  }
}
