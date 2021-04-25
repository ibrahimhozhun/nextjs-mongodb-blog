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

const app = express();

app.use(cors({
  // We are using an array here because we have 2 origins
  // One for showing content, and one for creating content
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

try {
  mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }, err => {
    if (err) throw Error(err.message);

    console.log("Connected with MongoDB");
    app.listen(PORT, () => console.log("Server is up and running on http://localhost:5000"));
  });
} catch (error) {
  console.log(error);
}
