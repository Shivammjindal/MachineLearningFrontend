import mongoose, { Schema, Document, model } from "mongoose";

// TypeScript Interface
export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  cardno: string;
  CardType: string;
  Time: string;       // e.g. "14:25:37"
  Date: string;       // e.g. "2025-05-17"
  Amount: number;
  TypeOfGoods: string;
  Location: string;
}

// Schema Definition
const transactionSchema: Schema<ITransaction> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users", // optional: reference to user model
  },
  cardno: {
    type: String,
    required: true,
  },
  CardType: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  TypeOfGoods: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
});

// Model Export
export const Transaction =
  mongoose.models.Transaction || model<ITransaction>("Transaction", transactionSchema);