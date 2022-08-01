const express = require("express");
const {
  newOrder,
  myOrders,
  getOrderDetails,
  getAllOrders,
  deleteOrder,
} = require("../Controllers/OrderController");

const { authMiddleware, authRoles } = require("../Middlewares/auth");

const router = express.Router();

router.route("/order/new").post(authMiddleware, newOrder);
router.route("/order/me").get(authMiddleware, myOrders);
router.route("/order/:id").get(authMiddleware, getOrderDetails);

// =============== Admin Routes ===============
router
  .route("/admin/order")
  .get(authMiddleware, authRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .delete(authMiddleware, authRoles("admin"), deleteOrder);

module.exports = router;
