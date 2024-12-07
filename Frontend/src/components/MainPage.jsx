import React, { useEffect, useState } from "react";
import courseService from "../services/course.js";
import userService from "../services/user";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import UserProfile from "../../../../Downloads/final-yucheng-an-main/frontend/src/components/UserProfile.jsx";
import Display from "./Display.jsx";
import PostBoard from "../../../../Downloads/final-yucheng-an-main/frontend/src/components/PostBoard.jsx";
import SearchDisplay from "../../../../Downloads/final-yucheng-an-main/frontend/src/components/SearchDisplay.jsx";


function MainPage(props) {
  const [courses, setCourses] = useState([]);
  const [userList, setUserList] = useState([]);
  const [buttonCoursesList, setButtonCoursesList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [comment, setComment] = useState("");
  const [togglePopular, setTogglePopular] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [failMessage, setFailMessage] = useState(null);

  // Prevent to refresh page cause logout
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedTaskAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            props.setUser(props.user);
            courseService.setToken(user.token);
        }
    }, []);

    // After Login, get all courses data from database
  useEffect(() => {
    courseService.getAll().then(setCourses);
    courseService.getAll().then(setButtonCoursesList);
      userService.getAll().then(setUserList);
  }, [props.user]);

  useEffect(() => {
      courseService.getAll().then(setCourses);
  }, [selectedCourse]);

  const handleShowPopular = () => {
     if(!togglePopular){
         const sortedCourses = [...courses].sort((a, b) => b.likes - a.likes);
         setCourses(sortedCourses);
         setTogglePopular(!togglePopular)
      }else{
         courseService.getAll().then(setCourses);
         setTogglePopular(!togglePopular)
     }
  };

  const handleCourseSelect = (target) => {
    const t = courses.find((c) => c.id === target);
    setSelectedCourse(t);
  };

  const handleCancelSelected = () => {
    setSelectedCourse(null);
  };

  const handleUpdateComment = async (event) => {
    event.preventDefault();
    const newComment = {
      userId: props.user.userId,
      comment: comment,
    };
    try {
      const response = await courseService.updateComment(
        selectedCourse.id,
        newComment,
      );

      setTogglePopular(false)
      setSelectedCourse(response.course);
      setComment("");

    } catch (error) {
      setFailMessage("Comment cannot be empty");
      setTimeout(() => {
        setFailMessage(null);
      }, 3000);
      console.log("Error happened:", error);
    }
  };

  const handleClickLike = async () => {
    try {
      const response = await courseService.updateLike(selectedCourse.id);
      const updatedCourses = courses.map((course) => {
        if (course.id === response.course.id) {
          return response.course;
        }
        return course;
      });
      setTogglePopular(false)
      setCourses(updatedCourses);
      setSelectedCourse(response.course);
    } catch (error) {
      setFailMessage(error);
      setTimeout(() => {
        setFailMessage(null);
      }, 3000);
      console.log("Error happened1:", error);
    }
  };

  const handleSearchChange = (event) => {
    const test = event.target.value;
    setSearchQuery(test);
  };

  const handleGoogleSearch = (event) => {
    event.preventDefault();
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(url, "_blank");
    setSearchQuery("");
  };
  const handleLuckySubmit = (event) => {
    event.preventDefault();
    const url = `https://engineering.pacific.edu/engineering/academics/MSCS`;
    window.open(url, "_blank");
    setSearchQuery("");
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await courseService.deleteComment(
        selectedCourse.id,
        commentId,
      );
      setSelectedCourse(response.course);
      console.log(response);
    } catch (error) {
      console.log("Error happened:", error);
    }
  };

  const contentToShow = searchQuery
    ? courses.filter(
        (course) =>
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <div>
      <Header />
      <div className="mainContainer">
        <div className="leftColumn">
          <UserProfile user={props.user} handleLogout={props.handleLogout} handleSwitchUser = {props.handleSwitchUser} />
          <form
            action="https://www.google.com/search"
            method="get"
            target="_blank"
            onSubmit={handleGoogleSearch}
          >
            <input
              className="searchInput"
              type="text"
              placeholder="Search"
              name="q"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">Google</button>{" "}
            <button type="button" onClick={handleLuckySubmit}>
              MSCS
            </button>
          </form>
          {contentToShow.length >= 1 && (
            <ul>
              {contentToShow.map((course) => (
                <SearchDisplay key={course.id} course={course} />
              ))}
            </ul>
          )}
          <h1>Computer science 200 Level Courses - 2024 Fall</h1>
          <p className="view">
            <button className="showAndHideButton" onClick={handleShowPopular}>
              {togglePopular ? "Default" : "Popular"}
            </button> {togglePopular ? "Now View Likes" : "Now Default View"}
          </p>
          {courses.map((c) => (
            <Display
              key={c.id}
              course={c}
              handleCourseSelect={handleCourseSelect}
            />
          ))}
        </div>
        <div className="rightColumn">
          <h1>Post Board</h1>
          {buttonCoursesList.map((c) => (
            <button
              className="selectButton"
              key={c.id}
              onClick={() => handleCourseSelect(c.id)}
            >
              {c.title}
            </button>
          ))}
          <PostBoard
            selectedCourse={selectedCourse}
            handleCancelSelected={handleCancelSelected}
            user={props.user}
            handleUpdateComment={handleUpdateComment}
            comment={comment}
            setComment={setComment}
            handleClickLike={handleClickLike}
            failMessage={failMessage}
            handleDelete={handleDelete}
            userList={userList}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MainPage;
