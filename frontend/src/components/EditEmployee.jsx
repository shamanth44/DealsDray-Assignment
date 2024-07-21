import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "./reuse/InputField";
import { Button } from "./reuse/Button";
import api from "./Instances/api";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function EditEmployee({ singleEmployee, id }) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      uniqueId: `${singleEmployee.uniqueId}`,
      name: `${singleEmployee.name}`,
      email: `${singleEmployee.email}`,
      mobileNo: singleEmployee.mobileNo,
      designation: `${singleEmployee.designation}`,
      gender: `${singleEmployee.gender}`,
      course: `${singleEmployee.course}`,
      image: null,
    },
  });

  const { register, control, handleSubmit, isSubmitting } = form;

  function handleCourseChange(selectedCourse) {
    const courseCheckboxes = document.querySelectorAll('input[name="course"]');
    courseCheckboxes.forEach((checkbox) => {
      if (checkbox.value !== selectedCourse) {
        checkbox.checked = false;
      }
    });
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("uniqueId", data.uniqueId);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobileNo", data.mobileNo);
    formData.append("designation", data.designation);
    formData.append("gender", data.gender);
    formData.append("course", data.course);
    formData.append("image", data.image?.[0]);
    try {
      const response = await axios.put(
        `https://employee-dashboard-backend-iota.vercel.app/api/v1/employee/update-employee/${id}`,
        formData
      );
      navigate("/dashboard");
      // console.log(response);
    } catch (error) {

      const errorMessage = error.response.data.message;
      setError(errorMessage);
      setLoading(false)
      // alert(error.response.data.message)
      // console.log(error);
    }
  };

  return (
    <>
      <div className="editEmployeeContainer">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 >Edit Employee</h1>
         
          <label htmlFor="uniqueId">UniqueId</label>
          <input
            type="text"
            name="uniqueId"
            id="uniqueId"
            {...register("uniqueId")}
          />

          <br />
          <br />

          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" {...register("name")} />

          <br />
          <br />

          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" {...register("email")} />

          <br />
          <br />

          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="text"
            name="mobileNo"
            id="mobileNo"
            {...register("mobileNo")}
          />

          <br />
          <br />

          <label htmlFor="image">Profile</label>
          <input type="file" name="image" id="image" {...register("image")} />

          <br />
          <br />

          <label htmlFor="designation">Choose Designation</label>
          <select
            defaultValue="Select designation"
            name="designation"
            id="designation"
            {...register("designation")}
          >
            <option value="Select designation" disabled hidden>
              Select designation
            </option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>

          <br />
          <br />

          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            id="male"
            {...register("gender")}
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            name="gender"
            value="Female"
            id="female"
            {...register("gender")}
          />
          <label htmlFor="female">Female</label>

          <br />
          <br />
          <label>Course</label>
          <input
            type="checkbox"
            name="course"
            value="MCA"
            id="mca"
            {...register("course")}
            onChange={() => handleCourseChange("MCA")}
          />
          <label htmlFor="mca">MCA</label>

          <input
            type="checkbox"
            name="course"
            value="BCA"
            id="bca"
            {...register("course")}
            onChange={() => handleCourseChange("BCA")}
          />
          <label htmlFor="bca">BCA</label>

          <input
            type="checkbox"
            name="course"
            value="BSC"
            id="bsc"
            {...register("course")}
            onChange={() => handleCourseChange("BSC")}
          />
          <label htmlFor="bsc">BSC</label>

          <br />
          <br />


          {error && (
            <p style={{ color: "red", padding: "0px", margin: "0px" }}>
              {error}
            </p>
          )}
          <br />
          <br />

          <button 
                className={`button ${loading ? "loadingbutton" : ""}`}
                disabled={isSubmitting || loading}
              >
                {!loading && "Update"} {loading && "Updating..."}
              </button>
        </form>
      </div>
    </>
  );

  //   const [uniqueId, setUniqueId] = useState("");
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [mobileNo, setMobileNo] = useState();
  //   const [designation, setDesignation] = useState("");
  //   const [gender, setGender] = useState("");
  //   const [course, setCourse] = useState("");
  //   const [image, setImage] = useState();
  //   const navigate = useNavigate();

  //   //   console.log(designation)

  //   axios.defaults.withCredentials = true;

  //   const editEmployee = async () => {
  //     const formData = new FormData();
  //     formData.append("uniqueId", uniqueId);
  //     formData.append("name", name);
  //     formData.append("email", email);
  //     formData.append("mobileNo", mobileNo);
  //     formData.append("designation", designation);
  //     formData.append("gender", gender);
  //     formData.append("course", course);
  //     formData.append("image", image);
  //     try {
  //       const response = await axios.put(
  //         `https://employee-dashboard-backend-iota.vercel.app/api/v1/employee//update-employee/${id}`,
  //         formData
  //       );
  //       navigate("/dashboard");
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   };

  //   const chooseGender = (e) => {
  //     setGender(e.target.value);
  //   };

  //   const chooseCourse = (e) => {
  //     setCourse(e.target.value);
  //   };

  //   return (
  //     <>

  //       <div className="mainContainer">
  //       <div className="backButton">
  //             <Link to={"/dashboard"}>
  //           <Button label={"< Go back"}/>
  //             </Link>
  //             </div>
  //         <div className="signup">

  //           <h1 className="register">Edit {singleEmployee.name}'s details</h1>
  //           <div className="inputField">
  //             <InputField
  //               onChange={(e) => {
  //                 setUniqueId(e.target.value);
  //               }}
  //               placeholder="uniqueId"
  //               label={"UniqueId"}
  //             />

  //             <InputField
  //               onChange={(e) => {
  //                 setName(e.target.value);
  //               }}
  //               placeholder="Name"
  //               label={"Name"}
  //             />

  //             <InputField
  //               onChange={(e) => {
  //                 setEmail(e.target.value);
  //               }}
  //               placeholder="Email"
  //               label={"Email"}
  //             />

  //             <InputField
  //               onChange={(e) => {
  //                 setMobileNo(e.target.value);
  //               }}
  //               placeholder="Mobile Number"
  //               label={"Mobile Number"}
  //             />
  //             <InputField
  //               id="picture"
  //               onChange={(e) => {
  //                 setImage(e.target.files[0]);
  //               }}
  //               placeholder="Upload picture"
  //               type="file"
  //               label={"Profile Picture"}
  //             />
  //           </div>

  //           <div className="selects">
  //             <div>
  //               <form action="">
  //                 <label className="label" htmlFor="designation">
  //                   Choose designation:
  //                 </label>
  //                 <select
  //                   defaultValue="Select designation"
  //                   name="designation"
  //                   id="designation"
  //                   onChange={(e) => {
  //                     setDesignation(e.target.value);
  //                   }}
  //                 >
  //                   <option value="Select designation" disabled hidden>
  //                     Select designation
  //                   </option>
  //                   <option value="HR">HR</option>
  //                   <option value="Manager">Manager</option>
  //                   <option value="Sales">Sales</option>
  //                 </select>
  //               </form>
  //             </div>

  //             <div>
  //               <div className="gender">
  //                 <p className="label">Choose Gender:  </p>
  //                 <input
  //                   type="radio"
  //                   name="gender"
  //                   value="Male"
  //                   id="male"
  //                   checked={gender === "Male"}
  //                   onChange={chooseGender}
  //                 />
  //                 <label className="label" htmlFor="male">
  //                   Male
  //                 </label>

  //                 <div>
  //                   <input
  //                     type="radio"
  //                     name="gender"
  //                     value="Female"
  //                     id="female"
  //                     checked={gender === "Female"}
  //                     onChange={chooseGender}
  //                   />
  //                   <label className="label" htmlFor="female">
  //                     Female
  //                   </label>
  //                 </div>
  //               </div>
  //             </div>
  // <div className="gender">
  //     <p className="label">Choose Course:  </p>

  //             <div>
  //               <input
  //                 type="checkbox"
  //                 name="MCA"
  //                 value="MCA"
  //                 id="mca"
  //                 checked={course === "MCA"}
  //                 onChange={chooseCourse}
  //               />
  //               <label className="label" htmlFor="mca">
  //                 MCA
  //               </label>
  //             </div>

  //             <div>
  //               <input
  //                 type="checkbox"
  //                 name="BCA"
  //                 value="BCA"
  //                 id="bca"
  //                 checked={course === "BCA"}
  //                 onChange={chooseCourse}
  //               />
  //               <label className="label" htmlFor="bca">
  //                 BCA
  //               </label>
  //             </div>

  //             <div>
  //               <input
  //                 type="checkbox"
  //                 name="BSC"
  //                 value="BSC"
  //                 id="bsc"
  //                 checked={course === "BSC"}
  //                 onChange={chooseCourse}
  //                 />
  //               <label className="label" htmlFor="bsc">
  //                 BSC
  //               </label>
  //             </div>
  //                 </div>
  //           </div>

  //           <div className="pt-4">
  //             <Button onClick={editEmployee} label={"Update"} />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
}

export default EditEmployee;
