import { useState } from "react";
import axios from "axios";
import { Button } from "./reuse/Button";
import { InputField } from "./reuse/InputField";
import "./css/register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm();

  const { register, control, handleSubmit, isSubmitting } = form;

  axios.defaults.withCredentials = true;

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      await axios.post(
        "https://employee-dashboard-backend-iota.vercel.app/api/v1/admin/register",
        formData
      );
      navigate("/signin");
    } catch (error) {
      const errorMessage = error.response.data.message;
      setError(errorMessage);
      setLoading(false);
    }
  };
  console.log(error);

  return (
    <>
      <div className="mainContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signup">
            <h1 className="register">Sign up</h1>
            
            <div className="inputField">
              <input
                className="input"
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                name="name"
                {...register("name")}
                placeholder="Name"
                type={"text"}
                label={"Name"}
              />
              <input
                className="input"
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                name="email"
                {...register("email")}
                placeholder="Email"
                type={"text"}
                label={"Email"}
              />
              <input
                className="input"
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                name="password"
                {...register("password")}
                placeholder="Password"
                label={"Password"}
                type={"password"}
              />
              <input
                className="input"
                // onChange={(e) => {
                //   setImage(e.target.files[0]);
                // }}
                name="image"
                {...register("image")}
                placeholder="Upload picture"
                type={"file"}
                label={"Profile Picture"}
              />
            </div>
            {error && (
              <p style={{ color: "red", padding: "0px", margin: "0px" }}>
                {error}
              </p>
            )}
            <div className="buttonBox">
              <button
                className={`button ${loading ? "loadingbutton" : ""}`}
                disabled={isSubmitting || loading}
              >
                {!loading && "Sign up"} {loading && "Signing up..."}
              </button>
              <p className="label">
                Already have an account?{" "}
                <Link to={"/signin"} className="sign">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
