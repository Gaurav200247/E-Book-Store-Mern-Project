const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "please provide price"],
    },
    rentPrice: {
      type: Number,
    },
    type: {
      type: String,
      required: [true, "please provide type"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    chapter_no: {
      type: Number,
      default: 1,
    },
    volume_no: {
      type: Number,
      default: 1,
    },
    synopsis: {
      type: String,
      required: [true, "please provide synopsis"],
    },
    featured: { type: String, default: "false" },

    authors: [{ type: String, required: true }],

    genres: [{ type: String, required: true }],

    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        ratings: {
          type: Number,
          default: 0,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    // original_PDF: [
    //   {
    //     public_id: { type: String, required: true },
    //     url: { type: String, required: true },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
