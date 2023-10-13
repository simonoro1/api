import mongoose, { Schema } from "mongoose";
const bcrypt = require('bcrypt');


export interface I_UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  membership: Schema.Types.ObjectId;
  myClub: Schema.Types.ObjectId
  phone: number;
  address: object;
  // activities: Array<[ObjectId]>;
  // billing: Array<[ObjectId]>;
  // payments: Array<String>;
}

const UserSchema: Schema<I_UserDocument> = new Schema({
  name: {type: String, min: 3, max: 255, required: true},
  email: { type: String, unique: true, required: true},
  password: { type: String , required: true},
  isVerified: {type: Boolean, default: false},
  membership: {type: Schema.Types.ObjectId, ref: 'Membership', default: null},
  myClub: {type: Schema.Types.ObjectId , ref: 'Club', default: null},
  // payments: {type: Array, default: []}
},{timestamps: true});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }


  next();
});

export const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);


