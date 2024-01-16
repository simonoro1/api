// import {Schema, Types} from "mongoose";
import mongoose, {Schema, Types} from "mongoose";



interface Bill {
    _id: Types.ObjectId,
    url: string
    date:  number
}

interface Lecutre {
    date: string,
    consume: number
}

export interface AccountDocument {
    accountNumber: string,
    accountHolder: {
        name: string,
        lastname: string
    },
    address: string,
    bills: Types.DocumentArray<Bill>,
    digitalBill: string,
    debt: number,
    isActive: boolean,
    deviceNumber: {
        number: number,
        lectures: Lecutre[], 
    }
}



const accountSchema = new Schema<AccountDocument>({
    accountNumber: String,
    accountHolder: {
        name: {type: String, required: true},
        lastname: {type:String, required: true}
    },
    digitalBill: String,
    address: Types.ObjectId,
    bills: [Types.ObjectId],
    debt: Number,
    isActive: Boolean,
})


const accountModel = mongoose.model("Account", accountSchema)
