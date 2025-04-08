import { model, Schema } from "mongoose";
import { Item } from "./item.model.js";

const billItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: Item,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

export const BillItem = model("BillItem", billItemSchema);
