import mongoose, { ObjectId } from "mongoose";
const bcrypt = require('bcrypt');

export interface I_UserDocument extends mongoose.Document {
  // email: string;
  name: string;
  password: string;
  status: boolean;
  membership: string;
  // name: string;
  // lastName: string;
  // dni: number;
  // phone: number;
  // address: object;
  // activities: Array<[ObjectId]>;
  // club: Array<[ObjectId]>;
  // billing: Array<[ObjectId]>;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  name: { type: String, unique: true, },
  password: { type: String , required: true},
  membership: {type: String, enum: ['None', 'Basic', 'Pro'], default: 'None'}
  // address: {street: String, number: Number, hood: String },
  // membership: [{name: String, price: Number}],
  // status: {type: Boolean, default: false},
  // club: []

});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

export const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);
