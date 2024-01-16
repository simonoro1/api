import {Types, Schema, ObjectId, model } from "mongoose";

const bcrypt = require('bcrypt');


export interface I_UserDocument extends Document {
  email: Schema.Types.ObjectId;
  password: string;
  profile: object;
  isVerified: boolean;
  active: boolean;
  accounts: Types.Array<ObjectId>

}



const UserSchema: Schema<I_UserDocument> = new Schema({
  email: { type: String, unique: true, required: true},
  password: { type: String , required: true},
  profile: {
		firstName: String,
		lastName: String,
		},
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


