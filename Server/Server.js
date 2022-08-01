require("dotenv").config({ path: "Server/.env" });
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./DB/ConnectDB");

const errorHandlerMiddleware = require("./Middlewares/errorHandler");
const notFoundMiddleware = require("./Middlewares/notFound");

const BookRoute = require("./Routes/BooksRoutes");
const UserRoute = require("./Routes/UserRoutes.js");
const OrderRoute = require("./Routes/OrderRoutes");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Package Middlewares
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }));

// App Middlewares
app.use(express.json());
app.use(cookieParser());

// App Routes
app.use("/api/v1", BookRoute);
app.use("/api/v1", UserRoute);
app.use("/api/v1", OrderRoute);

app.get("/", (req, res) => {
  res.send("Book Store App");
});

// App Error Middlwares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Port Listening...
const port = 4000 || process.env.PORT;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Listening on port ${port}... at http://localhost:4000/`)
    );
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();
