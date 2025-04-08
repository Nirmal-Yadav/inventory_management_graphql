import { model, Schema } from "mongoose";

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "item name is required"],
      trim: true,
      lowercase: "true",
    },
    quantity: {
      type: Number,
      required: [true, "item quantity is required"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "item price is required"],
      default: 0,
    },
  },
  { timestamps: true }
);

export const Item = model("Item", itemSchema);
