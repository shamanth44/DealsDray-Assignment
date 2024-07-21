import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "./reuse/InputField";
import { Button } from "./reuse/Button";
// import api from "./Instances/api";

function CreateEmployee() {
  const [uniqueId, setUniqueId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState();
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();

  //   console.log(designation)

  axios.defaults.withCredentials = true;

  const addEmployee = async () => {
    const formData = new FormData();
    formData.append("uniqueId", uniqueId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    formData.append("image", image);
   try {
     const response = await axios.post(
       "https://employee-dashboard-backend-iota.vercel.app/api/v1/employee/create-employee",
       formData
     );
     navigate("/dashboard");
     console.log(response);
   } catch (error) {
    console.log(error)
   }
  };

  const chooseGender = (e) => {
    setGender(e.target.value);
  };

  const chooseCourse = (e) => {
    setCourse(e.target.value);
  };

  return (
    <>
     
      <div className="mainContainer">
      <div className="backButton">
            <Link to={"/dashboard"}>
          <Button label={"< Go back"}/>
            </Link>
            </div> 
        <div className="signup">
                 
          <h1 className="register">Create Employee</h1>
          <div className="inputField">
            <InputField
              onChange={(e) => {
                setUniqueId(e.target.value);
              }}
              placeholder="uniqueId"
              label={"UniqueId"}
            />

            <InputField
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              label={"Name"}
            />

            <InputField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              label={"Email"}
            />

            <InputField
              onChange={(e) => {
                setMobileNo(e.target.value);
              }}
              placeholder="Mobile Number"
              label={"Mobile Number"}
            />
            <InputField
              id="picture"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              placeholder="Upload picture"
              type="file"
              label={"Profile Picture"}
            />
          </div>

          <div className="selects">
            <div>
              <form action="">
                <label className="label" htmlFor="designation">
                  Choose designation:
                </label>
                <select
                  defaultValue="Select designation"
                  name="designation"
                  id="designation"
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                >
                  <option value="Select designation" disabled hidden>
                    Select designation
                  </option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </form>
            </div>

            <div>
              <div className="gender">
                <p className="label">Choose Gender:  </p>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  id="male"
                  checked={gender === "Male"}
                  onChange={chooseGender}
                />
                <label className="label" htmlFor="male">
                  Male
                </label>

                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    id="female"
                    checked={gender === "Female"}
                    onChange={chooseGender}
                  />
                  <label className="label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
<div className="gender">
    <p className="label">Choose Course:  </p>

            <div>
              <input
                type="checkbox"
                name="MCA"
                value="MCA"
                id="mca"
                checked={course === "MCA"}
                onChange={chooseCourse}
              />
              <label className="label" htmlFor="mca">
                MCA
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                name="BCA"
                value="BCA"
                id="bca"
                checked={course === "BCA"}
                onChange={chooseCourse}
              />
              <label className="label" htmlFor="bca">
                BCA
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                name="BSC"
                value="BSC"
                id="bsc"
                checked={course === "BSC"}
                onChange={chooseCourse}
                />
              <label className="label" htmlFor="bsc">
                BSC
              </label>
            </div>
                </div>
          </div>

          <div className="pt-4">
            <Button onClick={addEmployee} label={"Create Employee"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEmployee;
