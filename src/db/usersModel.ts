import mongoose from "mongoose";
const bcrypt = require('bcrypt');

export interface I_UserDocument extends mongoose.Document {
  // email: string;
  name: string;
  password: string;
  membership: string;
  status: string;
  endDate: Date;
  myClub: mongoose.Types.ObjectId | undefined;
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
  myClub: [{type: mongoose.Schema.Types.ObjectId , ref: 'Club'}]
},{timestamps: true});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }


  next();
});

export const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);


// This.Update Sucription
// findonebyId / Email
// This.Update Club