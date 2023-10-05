import mongoose, { ObjectId, Schema } from "mongoose";
const bcrypt = require('bcrypt');

export interface I_UserDocument extends mongoose.Document {
  // email: string;
  name: string;
  password: string;
  membership: string;
  club: Schema.Types.ObjectId;
  status: string;
  endDate: Date;
  //created: dateTime
  // name: string;
  // lastName: string;
  // dni: number;
  // phone: number;
  // address: object;
  // activities: Array<[ObjectId]>;
  // billing: Array<[ObjectId]>;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  name: { type: String, unique: true, },
  password: { type: String , required: true},
  membership: {type: String, enum: ['None', 'Basic', 'Pro'], default: 'None'},
  status: {type: String, enum: ['Active', 'Paused', 'Canceled'], default: 'Active'},
  endDate: {
    type: Date,
    default: null,
  },
  club: {type: Schema.Types.ObjectId, ref: 'Club'},
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

export const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);
