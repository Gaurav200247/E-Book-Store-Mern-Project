const express = require("express");
const {
  getAllBooks,
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
  createReview,
  deleteReview,
  getAllReviews,
} = require("../Controllers/BookController");

const router = express.Router();

const { authMiddleware, authRoles } = require("../Middlewares/auth");

router.route("/books").get(getAllBooks);
router.route("/books/:id").get(getSingleBook);

router.route("/review").put(authMiddleware, createReview);
router.route("/review").delete(authMiddleware, deleteReview);
router.route("/admin/review").get(authMiddleware, getAllReviews);

// -----------------ADMIN ROUTES-----------------
router.route("/books").post(authMiddleware, authRoles("admin"), createBook);
router
  .route("/books/:id")
  .delete(authMiddleware, authRoles("admin"), deleteBook)
  .patch(authMiddleware, authRoles("admin"), updateBook);

module.exports = router;
