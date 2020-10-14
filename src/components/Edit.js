import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function Edit(props) {
  const [Exercises, setExercises] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get("http://localhost:5000/exercises/" + props.match.params.id)
        .then((res) => res);
      setExercises((prevData) => ({
        ...prevData,
        username: res.data.username,
        description: res.data.description,
        duration: res.data.duration,
        date: new Date(res.data.date),
      }));
      const res1 = await
      axios.get("http://localhost:5000/users").then( res => res);
      setExercises((prevData) => ({
        ...prevData,
        users: res1.data.map((user) => user.username),
      }));
    }
    fetchData();
  }, []);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setExercises((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const Exercise = {
      username: Exercises.username,
      description: Exercises.description,
      duration: Exercises.duration,
      date: Exercises.date,
    };

    console.log(Exercise);

    const goToHome = () => {
      window.location = "/";
    };

    axios
      .post(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        Exercise
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire({
            title: "Exercise Edited Successfully!",
            icon: "success",
            confirmButtonText: "Cool",
            didClose: () => goToHome(),
          });
        } else {
          Swal.fire({
            title: "Couldn't Edit Exercise!",
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
        <h3>Edit Exercise</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label for="userName">Username</label>
            <select
              class="form-control"
              name="username"
              value={Exercises.username}
              onChange={(e) => onChange(e)}
              id="userName"
            >
              {Exercises.users.map((user) => {
                return (
                  <option value={user} key={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Description</label>
            <input
              type="text"
              name="description"
              value={Exercises.description}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Duration</label>
            <input
              type="text"
              name="duration"
              value={Exercises.duration}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Date</label>
            <input
              type="date"
              name="date"
              value={Exercises.date}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Edit Exercise
          </button>
        </form>
      </div>
    </div>
  );
}
