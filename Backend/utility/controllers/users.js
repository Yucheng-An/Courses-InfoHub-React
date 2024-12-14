const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
// Get all users, Pass the test
usersRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    console.log("Get all users successfully!");
    response.json(users);
  } catch (error) {
    console.log("Error in getting all users", error.message);
  }
});

// Get user by username, Pass the test
usersRouter.get("/:username", async (request, response) => {
  try{
      const user = await User.findOne({ username: request.params.username });
      if (user) {
          response.json(user);
      } else {
          console.log("Get user by username error: User not found!");
          response.status(404).end();
      }
  }catch(error) {
      console.log("Error in getting user by username:", error.message);
  }
});

// Post user, Pass the test
usersRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
