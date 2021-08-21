import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    pickup_location: { type: String, required: true },
    destination: { type: String, required: true },
    recipient_name: { type: String, required: true },
    recipient_phone: { type: String, required: true },
    description: { type: String, required: false },
    present_location: { type: String, required: false },
    order_status: { type: String, required: true },
    // user_id: uuidv4(),
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
