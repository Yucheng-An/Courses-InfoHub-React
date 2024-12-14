import React, { useState, useEffect } from "react";

function UserProfile(props) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  useEffect(() => {
    const temp = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      //1000 = 1s refresh setup new value
    }, 1000);
    return () => clearInterval(temp);
  }, []);

  return (
    <div>
      <p>
        Welcome Back!  🥳🥳🥳 <strong>{props.user.name}</strong>
        <button className="showAndHideButton" onClick={props.handleLogout}>
          Logout
        </button>
        <button className = "delete-button" onClick={props.handleSwitchUser}>Switch</button>
      </p>
      <p>Your Username:<strong>{props.user.username}</strong></p>
      <p>Current Time: <strong>{currentTime}</strong> ⏲</p>
    </div>
  );
}

export default UserProfile;
