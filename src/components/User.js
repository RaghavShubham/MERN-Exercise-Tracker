import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function User() {
  const [username, setUsername] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const User = {
      username: username,
    };

    const goToHome = () => {
      setUsername("");
    };

    axios.post("http://localhost:5000/users/add", User).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        Swal.fire({
          title: "User Created Successfully!",
          icon: "success",
          confirmButtonText: "Cool",
          didClose: () => goToHome(),
        });
      } else {
        Swal.fire({
          title: "Couldn't Create User!",
          text: "Maybe it already exists.",
          icon: "error",
          confirmButtonText: "Try again",
          didClose: () => goToHome(),
        });
      }
    });
  };

  return (
    <div className="row">
      <div className="col">
        <h3>Create New User</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
              type="text"
              value={username}
              name="username"
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
