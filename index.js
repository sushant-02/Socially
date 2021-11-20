const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./server/routes/auth");
const postRoutes = require("./server/routes/post");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(`DB connection error: ${err.message}`);
  });

// Routes
app.use("/api", authRoutes);
app.use("/api", postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
