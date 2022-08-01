const Order = require("../Models/OrderModel");
const { StatusCodes } = require("http-status-codes");
const CustomAPIerror = require("../Errors/Custom-error");

const newOrder = async (req, res) => {
  const { order_type, book, Rent_Time, paymentInfo, itemsPrice, OrderStatus } =
    req.body;

  if (order_type === "rent") {
    const order = await Order.create({
      order_type,
      book,
      Rent_Timer: Date.now() + Rent_Time * 24 * 60 * 60 * 1000,
      paymentInfo,
      paidAt: Date.now(),
      itemsPrice, //calculated from frontend
      OrderStatus,
      user: req.user._id,
    });

    res.status(StatusCodes.CREATED).json({ success: true, order });
  }
  if (order_type === "buy") {
    const order = await Order.create({
      order_type,
      book,
      Rent_Timer: null,
      paymentInfo,
      paidAt: Date.now(),
      itemsPrice,
      OrderStatus,
      user: req.user._id,
    });

    res.status(StatusCodes.CREATED).json({ success: true, order });
  }
};

// Get Single Order Details
const getOrderDetails = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // gives email and name of user using order.user in which it comtains userId.

  if (!order) {
    throw new CustomAPIerror("Order not Found !!", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ success: true, order });
};

// Get Logged in User Orders
const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(StatusCodes.OK).json({ success: true, orders });
};

// ---------------ADMIN------------------------
// Get All Orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount = totalAmount + order.itemsPrice;
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, nbHits: orders.length, totalAmount, orders });
};
// Delete Order -- ADMIN
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new CustomAPIerror("Order not Found !!", StatusCodes.NOT_FOUND);
  }

  await order.remove();

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  newOrder,
  getOrderDetails,
  myOrders,
  getAllOrders,
  deleteOrder,
};
