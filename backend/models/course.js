const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  postDate: Date,
  userId: mongoose.Schema.Types.ObjectId,
  commentId: String
});

//Create course_schema
const courseSchema = new mongoose.Schema({
  id: Number,
  crn: Number,
  subject: String,
  course: String,
  section: Number,
  credit: Number,
  title: String,
  days: Array,
  time: String,
  instructor: String,
  location: String,
  semester: String,
  comments: [commentSchema],
  likes: Number,
  instruction: String
});

courseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._v;
    delete returnedObject._id;

    returnedObject.comments.forEach(comment => {
      comment.commentId = comment._id.toString()
      delete comment._id
    })
  },
});

module.exports = mongoose.model("Course", courseSchema);
