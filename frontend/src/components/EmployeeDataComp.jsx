import React from "react";
// import api from "./Instances/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeDataComp({
  getEmployees,
  id,
  uniqueId,
  image,
  name,
  mobileNo,
  gender,
  email,
  designation,
  course,
  createdAt
}) {
  const navigate = useNavigate();
  const deleteEmployee = async () => {
    await axios.delete(
      `https://employee-dashboard-backend-iota.vercel.app/api/v1/employee/delete-employee/${id}`
    );
    getEmployees();
  };
  return (
    <>
      <tr>
        <td>{uniqueId}</td>
        <td>
          <img src={image} width={50} height={50} />
        </td>
        <td>{name}</td>
        <td>{mobileNo}</td>
        <td>{gender}</td>
        <td>{email}</td>
        <td>{designation}</td>
        <td>{course}</td>
        <td>{createdAt}</td>
        <td className="action">
          <button
            onClick={() => {
              navigate(`/edit-employee/${id}`);
            }}
            className="actionButton1"
          >
            Edit
          </button>
          <button className="actionButton2" onClick={deleteEmployee}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default EmployeeDataComp;
