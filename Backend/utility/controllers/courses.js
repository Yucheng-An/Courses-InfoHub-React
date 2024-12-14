const Course = require("../models/course");
const jwt = require("jsonwebtoken");
const coursesRouter = require("express").Router();
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//Get all courses, Pass the test
coursesRouter.get("/", async (request, response) => {
  try {
    const course = await Course.find({});
    console.log("Get all courses successfully!");
    response.json(course);
  } catch (error) {
    console.log("Error in getting all courses", error.message);
  }
});

// Get course by id, Pass the test
coursesRouter.get("/:id", async (request, response) => {
  try {
    const course = await Course.findOne({ id: request.params.id });
    if (course) {
      response.json(course);
    } else {
      console.log("Get course by id error: Course not found!");
      response.status(404).end();
    }
  } catch (error) {
    console.log("Error in getting course by id:", error.message);
  }
});

//Course post, Pass the test Not need!
coursesRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    const course = new Course({
      ...body,
    });
    const savedCourse = await course.save();
    response.json(savedCourse);
  } catch (error) {
    console.log("Error in posting course:", error.message);
    response.status(500).end();
  }
});

//Course post, Pass the test
coursesRouter.put("/:id", async (request, response) => {
  const courseId = +request.params.id;
  const { userId, comment } = request.body;
  if (!comment || !comment.trim()) {
    return response.status(400).json({ error: "Comment must not be empty" });
  }
  const userList = await User.findOne({ id: userId });
  // const course = await Course.find({});

  console.log("This is userList", userList);
  const newComment = {
    comment: comment,
    userId: userId,
    postDate: new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    }),
  };
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { id: courseId },
      { $push: { comments: newComment } },
      { new: true, runValidators: true },
    );
    // const updatedUser = await User.findOneAndUpdate(
    //   { id: userId },
    //   { $push: { comments: newComment } },
    //   { new: true, runValidators: true },
    // );
    if (updatedCourse) {
      response.json({
        course: updatedCourse,
        // user: updatedUser,
      });
    } else {
      response.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error happened: ", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Course post, Pass the test
coursesRouter.put("/:id/likes", async (request, response) => {
  const courseId = +request.params.id;
  console.log(courseId);
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { id: courseId },
      { $inc: { likes: 1 } },
      { new: true, runValidators: true },
    );
    if (updatedCourse) {
      response.json({
        course: updatedCourse,
      });
    }
  } catch (error) {
    console.error("Error happened: ", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

coursesRouter.delete("/:courseId/:commentId", async (request, response) => {
  const courseId = parseInt(request.params.courseId);
  const commentId = request.params.commentId;

  console.log("Course ID:", courseId, "Comment ID:", commentId);
  try {
    const course = await Course.findOne({ id: courseId });
    const comments = course.comments;
    console.log(comments);
    const originalCommentsLength = course.comments.length;
    course.comments = course.comments.filter(
      (comment) => comment._id.toString() !== commentId,
    );

    if (course.comments.length === originalCommentsLength) {
      return response.status(404).json({ message: "Comment not found" });
    }
    await course.save();
    response.json({
      message: "Comment deleted successfully",
      course: course
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = coursesRouter;
