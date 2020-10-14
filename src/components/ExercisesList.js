import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> | 
      <a href="#" onClick={() => props.delete(props.exercise._id)}>
        delete
      </a>
    </td>
  </tr>
);

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get("http://localhost:5000/exercises")
        .then((res) => res.data);
      setExercises(res);
    }
    fetchData();
  }, []);

  const deleteExercise = (id) => {
    axios.delete("http://localhost:5000/exercises/" + id).then((res) =>
      Swal.fire({
        title: "Exercise Deleted Successfully",
        icon: "success",
        confirmButtonText: "Okie Dokie!",
      })
    );

    setExercises(exercises.filter((item) => item._id !== id));
  };

  const List = () =>
    exercises.map((item) => (
      <Exercise delete={deleteExercise} exercise={item} key={item._id} />
    ));

  return (
    <div className="row">
      <div className="col">
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{List()}</tbody>
        </table>
      </div>
    </div>
  );
}
