import React from "react";

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function PostBoard({
  selectedCourse,
  handleCancelSelected,
  handleUpdateComment,
  comment,
  setComment,
  handleClickLike,
  failMessage,
  user,
  handleDelete,
  userList,
}) {
  if (selectedCourse === null) {
    return null;
  }

  const handleCommentOnChange = (event) => {
    setComment(event.target.value);
  };


  return (
    <div>
      <div>
        <p>
          Course Name: {selectedCourse.title} - {selectedCourse.instructor}
          <button className="likesButton" onClick={handleClickLike}>
            👍{selectedCourse.likes}
          </button>
        </p>
      </div>
      <div className="two-column-container">
        <div>
          <h3>Class Comments</h3>
          {selectedCourse.comments.map((item, index) => (
            <div key={index} className="comment-container">
              <li className="comment-text">{item.comment}</li>
              <span className="comment-date">
                {" "}
                post by {
                  userList.find((user) => user.id === item.userId)?.name
                }{" "}
                - {formatDate(item.postDate)}{" "}
                {item.userId === user.userId && (
                  <button className= "delete-button" onClick={() => handleDelete(item.commentId)}>
                    Delete
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
        {failMessage != null ? (
          <p className="fail">Comment cannot be empty!</p>
        ) : null}
        <form onSubmit={handleUpdateComment}>
          <input
            type="text"
            className="postBoardInput"
            placeholder="Type your comment here..."
            value={comment} // Controlled component
            onChange={handleCommentOnChange}
            name="newComment"
          />
          <button type="submit">Submit</button>{" "}
          <button type="button" onClick={handleCancelSelected}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostBoard;
