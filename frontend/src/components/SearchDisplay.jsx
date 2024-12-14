import React from "react";
// After input search value, display search result.
function SearchDisplay(props) {
  return (
    <div>
      <p>
          Title: <strong>{props.course.title}❗️</strong> - Instructor: <strong>{props.course.instructor}❗️</strong>
      </p>
    </div>
  );
}
export default SearchDisplay;
