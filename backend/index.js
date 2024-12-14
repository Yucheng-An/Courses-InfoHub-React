require("dotenv").config();
const express = require("express");

const coursesRouter = require("../../Downloads/final-yucheng-an-main/backend/controllers/courses");
const usersRouter = require("../../Downloads/final-yucheng-an-main/backend/controllers/users");
const loginRouter = require("../../Downloads/final-yucheng-an-main/backend/controllers/login");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));

app.use(express.json());

const mongoose = require("mongoose").set("strictQuery", true);

// Connecting MongoDB
const url = process.env.MONGODB_URI;
console.log("Connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.log("Error connect to MongoDB, error message:", error.message);
  });
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.get("/", async (request, response) => {
  await response.send("<h1>This is backend of final project, GET method </h1>");
});

app.use("/api/login", loginRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
