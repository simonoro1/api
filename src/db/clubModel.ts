import mongoose, { ObjectId } from "mongoose";
const bcrypt = require('bcrypt');

export interface I_ClubDocument extends mongoose.Document {
    name: string,
    adress: object,
    phone: number,
    crowd: number,
    activities: Array<[ObjectId]>
}

const ClubSchema: mongoose.Schema<I_ClubDocument> = new mongoose.Schema({
    name: String,
    adress: {street: String, number: Number, State: String,},
    phone: Number,
    crowd: {type: Number, default: 0},
    activities: []

});

// UserSchema.pre("save", async function (next) {

// });

export const ClubModel = mongoose.model<I_ClubDocument>("Club", ClubSchema);
