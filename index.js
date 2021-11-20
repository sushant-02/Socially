require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
