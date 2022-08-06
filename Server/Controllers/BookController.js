const Book = require("../Models/BookModel");
const { StatusCodes } = require("http-status-codes");
const CustomAPIerror = require("../Errors/Custom-error");
const cloudinary = require("cloudinary").v2;

// --------------------------------------- Get All books ---------------------------------------
const getAllBooks = async (req, res) => {
  const { title, genres, rating, price, type } = req.query;
  const queryObject = {};

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (genres && genres.length > 0) {
    let genresArray = genres.split(",");
    queryObject.genres = { $all: genresArray };
  }

  if (type && type !== "All") {
    queryObject.type = type;
  }

  if (rating) {
    queryObject.rating = { $gte: 0, $lte: rating };
  }

  if (price) {
    let priceArray = price.split(",");
    queryObject.price = {
      $gte: Number(priceArray[0]),
      $lte: Number(priceArray[1]),
    };
  }

  // console.log(queryObject);
  // ------------------pagination------------------
  let result = Book.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // ------------------pagination------------------

  const books = await result;
  const Searchedbooks = await Book.find(queryObject);
  const Allbooks = await Book.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    totalBooks: Allbooks.length,
    nbHits: books.length,
    totalSearchedBooks: Searchedbooks.length,
    books,
  });
};

// --------------------------------------- Create a book ---------------------------------------
const createBook = async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Ecommerce App Products Pics",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const book = await Book.create(req.body);

  book.rentPrice = 0.4 * book.price;

  await book.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({ success: true, book });
};

// --------------------------------------- Get a Single book ---------------------------------------
const getSingleBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new CustomAPIerror(
      `book with id ${req.params.id} not found`,
      StatusCodes.BAD_REQUEST
    );
  }

  res.status(StatusCodes.OK).json({ success: true, book });
};

// --------------------------------------- Update a book ---------------------------------------
const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.find({ id });

  if (!book) {
    throw new CustomAPIerror(
      `book with id ${id} not found`,
      StatusCodes.BAD_REQUEST
    );
  }

  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ success: true, updatedBook });
};

// --------------------------------------- Delete a book ---------------------------------------
const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.find({ id });

  if (!book) {
    throw new CustomAPIerror(
      `book with id ${id} not found`,
      StatusCodes.BAD_REQUEST
    );
  }

  const deletedBook = await Book.findByIdAndRemove(id, req.body);

  res.status(StatusCodes.OK).json({ success: true, deletedBook });
};

// --------------------------------------- Create/Update a Review ---------------------------------------
const createReview = async (req, res) => {
  const { ratings, comment, bookId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    ratings: Number(ratings),
    comment,
  };

  const book = await Book.findById(bookId);

  if (!book) {
    throw new CustomAPIerror("Book Not Found", StatusCodes.NOT_FOUND);
  }

  const isReviewed = book.reviews.find(
    (item) => item.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    book.reviews.forEach((item) => {
      if (item.user.toString() === req.user._id.toString()) {
        item.ratings = ratings;
        item.comment = comment;
      }
    });
  } else {
    book.reviews.push(review);
  }

  let avg = 0;

  book.reviews.forEach((rev) => {
    avg = avg + rev.ratings;
  });
  book.rating = avg / book.reviews.length;

  await book.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({
    success: true,
  });
};

// Get all Reviews of a Single product for Admin
const getAllReviews = async (req, res) => {
  const { bookId } = req.query;

  const book = await Book.findById(bookId);

  if (!book) {
    throw new CustomAPIerror("Book not Found !!", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    numOfReviews: book.reviews.length,
    reviews: book.reviews,
  });
};

// Delete a Review for logged in user
const deleteReview = async (req, res) => {
  const { BookID, reviewId } = req.query;

  const book = await Book.findById(BookID);

  if (!book) {
    throw new CustomAPIerror("Book not Found !!", StatusCodes.NOT_FOUND);
  }

  const reviews = book.reviews.filter(
    (rev) => rev._id.toString() != reviewId.toString()
  );

  // taking out avg rating and setting it to product.rating
  let avg = 0;

  reviews.forEach((rev) => {
    avg = avg + rev.ratings;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  await Book.findByIdAndUpdate(
    BookID,
    { reviews, rating },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ success: true });
};

// ---------------------------------- Exports ----------------------------------
module.exports = {
  getAllBooks,
  getSingleBook,
  updateBook,
  createBook,
  deleteBook,
  createReview,
  deleteReview,
  getAllReviews,
};
