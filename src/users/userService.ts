// import { DocumentDefinition} from 'mongoose';
import { HydratedDocument } from "mongoose";
import { UserModel, I_UserDocument } from "../db/usersModel";
import { error } from "console";
import bcrypt from "bcrypt";
import { I_ClubDocument } from "../db/clubModel";

export async function signUp(
  user: HydratedDocument<I_UserDocument>
): Promise<I_UserDocument>  {
  try {
    return await UserModel.create(user); 
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

export async function myClub(club: HydratedDocument<I_ClubDocument>, user: HydratedDocument<I_UserDocument>) {
  try {
    // update user
    user.myClub = club.id
    user.save()
    console.log('Club selected succesfully')
    return user
  } catch (error) {
    throw error
  }
}
