import mongoose, { Schema } from "mongoose";
const bcrypt = require('bcrypt');

export interface I_UserDocument extends Document {
  // email: string;
  name: string;
  password: string;
  membership: Schema.Types.ObjectId;
  status: string;
  endDate: Date;
  myClub: Schema.Types.ObjectId
  //created: dateTime
  // name: string;
  // lastName: string;
  // dni: number;
  // phone: number;
  // address: object;
  // activities: Array<[ObjectId]>;
  // billing: Array<[ObjectId]>;
}

const UserSchema: Schema<I_UserDocument> = new Schema({
  name: { type: String, unique: true, },
  password: { type: String , required: true},
  membership: {type: Schema.Types.ObjectId, ref: 'Membership', default: null},
  status: {type: String, enum: ['Active', 'Paused', 'Canceled'], default: 'Active'},
  endDate: {
    type: Date,
    default: null,
  },
  myClub: {type: Schema.Types.ObjectId , ref: 'Club', default: null}
},{timestamps: true});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }


  next();
});

export const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);


