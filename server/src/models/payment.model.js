import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["mpesa", "card", "cash"],
      default: "mpesa",
      required: true,
    },
    transactionId: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel
