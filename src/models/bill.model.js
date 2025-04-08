// import mongoose from "mongoose";
// import { BillItem } from "./billItem.model.js";

// const billSchema = new mongoose.Schema({
//   items: [{ type: mongoose.Schema.Types.ObjectId, ref: BillItem }],
//   totalAmount: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export const Bill = mongoose.model("Bill", billSchema);

import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  items: [
    {
      _id: false,
      // item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      productId: { type: String, required: [true, "product id is required"] },
      quantity: { type: Number, required: true },
      name: { type: String, trim: "true" },
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Bill = mongoose.model("Bill", billSchema);
