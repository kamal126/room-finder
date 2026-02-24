import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import userRouter from "./routes/user.route.js";
import roomRouter from "./routes/room.router.js";
import reviewRouter from "./routes/review.route.js";

import { connect } from "./db/connect.js";

dotenv.config(); // MUST be at top

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ================= CORS =================
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://room-finder-sage.vercel.app",
    ],
    credentials: true,
  })
);
// ================ Middleware ================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// ================ Test Route ================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================ Routes ===================
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/reviews", reviewRouter);

// ================ 404 Handler ==============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ================ Start Server =============
const startServer = async () => {
  try {
    await connect();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();