import React from "react";

// Not be used in frontend
function CreateForms(props){
    return (
        <div className = "divLogin">
            <h1 className="h1Login">Create a new user</h1>
            <form className="formLogin">
                <label>
                    Username: <input type="text" name="username" />
                </label>
                <label>
                    Password: <input type="password" name="password" />
                </label>
                <label>
                    Name: <input type="text" name="name" />
                </label>
                <button className="buttonLogin" type="submit">
                    Create
                </button>
                <button
                    className="buttonLogin"
                    type="submit"
                    onClick = {props.cancelCreate}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
export default CreateForms;
