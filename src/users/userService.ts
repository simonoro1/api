// import { DocumentDefinition} from 'mongoose';
import { HydratedDocument } from "mongoose";
import {UserModel,  I_UserDocument } from './usersModel';


export async function signUp(user: HydratedDocument<I_UserDocument>): Promise<void> {
 try {
   await UserModel.create(user);
 } catch (error) {
   throw error;
 }
}

export async function login(user: HydratedDocument<I_UserDocument>): Promise<void> {
 try {
   const foundUser = await UserModel.findOne({ name: user.name, password: user.password });
 } catch (error) {
   throw error;
 }
}



