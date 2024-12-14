import React, { useState } from "react";
import DisplayDetail from "./DisplayDetail.jsx";
function Display(props) {
  // Decide if open detail or close detail, initial value is false.
  const [visibleDetail, setVisibleDetail] = useState(false);
  // After click Show or Detail button
  const toggleDetails = () => {
    setVisibleDetail(!visibleDetail);
  };
  return (
    <div>
      <li>
        {props.course.subject} {props.course.course}-<span onClick={toggleDetails}>{props.course.title}</span> - 👍
        {props.course.likes}{" "}
        <button className="showAndHideButton" onClick={toggleDetails}>
          {visibleDetail ? "Hide" : "Show"}
        </button>
      </li>
      {visibleDetail ? <DisplayDetail course={props.course} /> : null}
    </div>
  );
}
export default Display;
