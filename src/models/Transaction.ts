import mongoose from "mongoose";

export interface ITransaction {
    _id : mongoose.Types.ObjectId,
    user : mongoose.Types.ObjectId,
    cardno : string,
    type : string,
    device : string
}

const transactionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    cardno : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    },
    device : {
        type : String,
        required: true
    }
})

export const Transaction = mongoose.models.transactions || mongoose.model<ITransaction>('transactions',transactionSchema)