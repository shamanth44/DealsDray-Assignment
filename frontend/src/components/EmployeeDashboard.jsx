import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import api from "./Instances/api";
import EmployeeDataComp from "./EmployeeDataComp";
import { InputField } from "./reuse/InputField";
import { Link } from "react-router-dom";
import { Button } from "./reuse/Button";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [search, setSearch] = useState("");

  axios.defaults.withCredentials = true;
  const filtered = employee.filter(
    (data) =>
      data.uniqueId.startsWith(search, 0) ||
      data.name.toLowerCase().startsWith(search, 0) ||
      data.name.startsWith(search, 0) ||
      data.gender.toLowerCase().startsWith(search, 0) ||
      data.gender.startsWith(search, 0) ||
      data.email.toLowerCase().startsWith(search, 0) ||
      data.mobileNo.toString().startsWith(search, 0)
  );
  const getEmployees = async () => {
    const response = await axios.get(
      "https://employee-dashboard-backend-iota.vercel.app/api/v1/employee/get-employees"
    );
    const employeeData = await response.data.data;
    setEmployee(employeeData);
    setHasData(true);
  };

  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <>
      {/* {employee.map((employee1, index) => {
        return <p key={index}>{employee1.name}</p>;
      })} */}

      <div className="employeeTable">
        {hasData && (
          <>
            <div className="tableTop">
              {/* <label htmlFor="searchEmployee" style={{ color: "white" }}>
              Search
            </label> */}
              <h1>Employee Dashboard</h1>
              <div className="searchAndCount">
                <input
                  className="searchInput"
                  type="text"
                  id="searchEmployee"
                  placeholder="Search employees"
                  onChange={(e) => {
                    setTimeout(() => {
                      setSearch(e.target.value);
                    }, 1000);
                  }}
                />
        <Link className="dashboard" to={"/create-employee"}><Button label={"Create"} /></Link>
                <p>Total Count: {filtered.length}</p>

              </div>
            </div>
            <table id="table">
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>
                    Gender
                    
                    {/* <select
                      defaultValue="Select"
                      name="select"
                      id="select"
                      onChange={(e) => {
                        setTimeout(() => {
                          setSearch(e.target.value);
                        }, 1000);
                      }}
                    >
                      <option value="Select" disabled hidden>
                        Select
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select> */}
                  </th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Course</th>
                  <th>Create date</th>
                  <th>Action</th>
                </tr>
                {filtered.length > 0 ? (
                  filtered.map((currentEmployee, index) => {
                    return (
                      <EmployeeDataComp
                        getEmployees={getEmployees}
                        key={index}
                        id={currentEmployee._id}
                        uniqueId={currentEmployee.uniqueId}
                        image={currentEmployee.image}
                        name={currentEmployee.name}
                        mobileNo={currentEmployee.mobileNo}
                        gender={currentEmployee.gender}
                        email={currentEmployee.email}
                        designation={currentEmployee.designation}
                        course={currentEmployee.course}
                        createdAt={new Date(
                          currentEmployee.createdAt
                        ).toLocaleDateString("en-GB")}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="10">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div
              className="pagination"
              style={{ textAlign: "center", height: "50px" }}
            >
              Pagination to be implemented
            </div>
          </>
        )}
      </div>
      <div className="loading">{!hasData && <p>Loading...</p>}</div>
    </>
  );
}

export default EmployeeDashboard;
