const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_type: {
      // rent or buy
      type: "String",
      requred: [true, "please provide order_type"],
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    Rent_Timer: {
      type: Date, // In Numbers
      required: true, // can be added dynamically
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    itemsPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    OrderStatus: {
      type: String,
      required: true,
      default: "Processing", // On rent , Bought
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
