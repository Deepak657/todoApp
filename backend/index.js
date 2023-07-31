const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config({ path: "./config.env" });
const DB = process.env.DB_CONNECT;
const todoRoutes = require("./routes/todoRoutes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// connect to db
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
  })
  .then(() => console.log("connection successful!"));
app.use("/api/v1", todoRoutes);

const port = 3001;
app.listen(port, () => console.log(`app running on port ${port}`));
