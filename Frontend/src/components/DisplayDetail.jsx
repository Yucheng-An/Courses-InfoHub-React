import React from "react";

function DisplayDetail(props) {
    const formatDays = (days) => {
        if (days.length > 1) {
            return `${days.slice(0, -1).join(", ")} - ${days[days.length - 1]}`;
        }
        return days.join("");
    };
    return (
        <div className="showDetailContainer">
            <p className="showDetailTitle">CRN: <span>{props.course.crn}</span></p>
            <p className="showDetailTitle">Instructor: <span>{props.course.instructor}</span></p>
            <p className="showDetailTitle">Location: <span>{props.course.location}</span></p>
            <p className="showDetailTitle">Time: <span>{props.course.time}</span></p>
            <p className="showDetailTitle">Credit: <span>{props.course.credit}</span></p>
            <p className="showDetailTitle">Day: <span>{formatDays(props.course.days)}</span></p>
            <p className="showDetailTitle">Instruction: <strong>{props.course.instruction}</strong></p>
        </div>

    );
}

export default DisplayDetail;