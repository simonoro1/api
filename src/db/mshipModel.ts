import mongoose, { ObjectId, Schema } from "mongoose";
const bcrypt = require('bcrypt');

export interface I_MembershipDocument extends mongoose.Document {
    mship: string,
    price: number,
    status: boolean
    startDate: Date,
    endDate: Date,

}

const MembershipSchema: mongoose.Schema<I_MembershipDocument> = new mongoose.Schema({
    mship: {type: String,  enum : ['Mensual', 'Trimestral', 'Semestral', 'Anual'], default: undefined},
    price: Number,
    status: Boolean,
    startDate: Date,
    endDate: Date,
}, );


// UserSchema.pre("save", async function (next) {

// });

export const MembershipModel = mongoose.model<I_MembershipDocument>("Membership", MembershipSchema);
