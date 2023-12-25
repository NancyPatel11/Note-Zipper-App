const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const notes = require("./data/notes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/mynotes", (req, res) => {
  res.send(notes);
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log(`server running on port ${PORT}`));
