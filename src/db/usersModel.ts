import {Schema, model } from "mongoose";

const bcrypt = require('bcrypt');


export interface I_UserDocument extends Document {
  email: string;
  userName: string;
  password: string;
  isVerified: boolean;
  active: boolean;
}



const UserSchema: Schema<I_UserDocument> = new Schema({
  email: { type: String, unique: true, required: true},
  userName: {type: String, required: true},
  password: { type: String , required: true},
  isVerified: {type: Boolean, default: false},
  active: {type: Boolean, default: true}
},{timestamps: true});



UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }


  next();
});

export const UserModel = model<I_UserDocument>("User", UserSchema);


