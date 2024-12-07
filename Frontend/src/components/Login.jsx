import React from "react";

function Login(props) {
  return (
    <div className="divLogin">
      {props.failMessage != null ? (
        <p className="fail">Wrong username or password</p>
      ) : null}
      <h1 className="h1Login">
        Login
        <button className="buttonLogin" onClick={props.handleSwitchUser}>
          Demo
        </button>
      </h1>

      <form className="formLogin" onSubmit={props.handleLogin}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </label>
        <button className="buttonLogin" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
