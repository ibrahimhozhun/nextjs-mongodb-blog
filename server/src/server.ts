import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
// Routes
import authRoutes from "./routers/auth";
import postRoutes from "./routers/post";

// Environment configuration
dotenv.config({ path: ".env.local" });

const DB_URI = process.env.DB_URI || "";
const PORT = process.env.PORT || 5000;
const client_origin = process.env.CLIENT_ORIGIN || "";
const author_client_origin = process.env.AUTHOR_CLIENT_ORIGIN || "";
const app = express();

// We need this middleware to send and receive data in json format
app.use(express.json({ limit: '50mb' }));
// We send and receive images so we need to limit it
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  // We are using an array here because we have 2 origins
  // One for showing content, and one for creating content
  origin: [client_origin, author_client_origin],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
// We use this middleware to send cookies to client
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Connect to MongoDB
mongoose.connect(DB_URI, {
  // Connection configuration
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, err => {
  // Catch errors
  if (err) {
    console.log(err);
  } else {
    console.log("Connected with MongoDB");
    app.listen(PORT, () => console.log("Server is up and running on http://localhost:5000"));
  }
});