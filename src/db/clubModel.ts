import mongoose, { ObjectId, Schema } from "mongoose";
const bcrypt = require('bcrypt');

export interface I_ClubDocument extends mongoose.Document {
    name: string,
    address: object,
    phone: number,
    crowd: number,
    activities: Array<[ObjectId]>
}

const ClubSchema: mongoose.Schema<I_ClubDocument> = new mongoose.Schema({
    name: String,
    address: {street: String, number: Number, city: String,},
    phone: Number,
    crowd: {type: Number, default: 0},
    activities: [{type: Schema.Types.ObjectId, ref:'Activities'}]
});

// UserSchema.pre("save", async function (next) {

// });

export const ClubModel = mongoose.model<I_ClubDocument>("Club", ClubSchema);
