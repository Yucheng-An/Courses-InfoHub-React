import React, { useEffect, useState } from "react";
import MainPage from "../../../Downloads/final-yucheng-an-main/frontend/src/components/MainPage.jsx";
import Login from "../../../Downloads/final-yucheng-an-main/frontend/src/components/Login.jsx";
import courseService from "../../../Downloads/final-yucheng-an-main/frontend/src/services/course.js";
import loginService from "../../../Downloads/final-yucheng-an-main/frontend/src/services/login.js";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [failMessage, setFailMessage] = useState(null);
  const [userNumber, setUserNumber] = useState(1);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedTaskAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setLogin(true);
      courseService.setToken(user.token);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedTaskAppUser", JSON.stringify(user));
      setUser(user);
      setLogin(!login);
      const loggedUserJSON = window.localStorage.getItem("loggedTaskAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        setLogin(true);
        courseService.setToken(user.token);
      }
    } catch (error) {
      setFailMessage("Wrong username or password");
      setTimeout(() => {
        setFailMessage(null);
      }, 3000);
      console.log("Error happened:", error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedTaskAppUser");
    setUser(null);
    setLogin(!login);
  };
 // For Demo
  const handleSwitchUser = async () => {
    if (userNumber === 1) {
      setUser(null);
      setLogin(false);
      const user = await loginService.login({
        username: "arlettebenjamine@projecttest.com",
        password: "4y7u4W",
      });
      window.localStorage.setItem("loggedTaskAppUser", JSON.stringify(user));
      setUser(user);
      setLogin(true);
      setUserNumber(2);
      const loggedUserJSON = window.localStorage.getItem("loggedTaskAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        setLogin(true);
        courseService.setToken(user.token);
      }
    } else if (userNumber === 2) {
      setUser(null);
      setLogin(false);
      const user = await loginService.login({
        username: "lionelperla@projecttest.com",
        password: "2ogyVBZR",
      });
      window.localStorage.setItem("loggedTaskAppUser", JSON.stringify(user));
      setUser(user);
      setLogin(true);
      setUserNumber(1);
      const loggedUserJSON = window.localStorage.getItem("loggedTaskAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        setLogin(true);
        courseService.setToken(user.token);
      }
    }
  };

  return (
    <div>
      {!login ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          failMessage={failMessage}
          handleSwitchUser={handleSwitchUser}
        />
      ) : (
        <MainPage
          user={user}
          handleLogout={handleLogout}
          handleSwitchUser={handleSwitchUser}
          setUser = {setUser}
        />
      )}
    </div>
  );
}

export default App;
