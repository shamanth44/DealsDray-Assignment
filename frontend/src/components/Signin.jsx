import { useState } from "react";
import axios from "axios";
import { Button } from "./reuse/Button";
import { InputField } from "./reuse/InputField";
import "./css/register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm();
  const { register, control, handleSubmit, isSubmitting } = form;


  axios.defaults.withCredentials = true;
  const signin = async () => {
    try {
    setLoading(true);

       await axios.post(
        "https://deals-dray-assignment.vercel.app/api/v1/admin/login",
        {email, password}
      );
      navigate("/dashboard")
      // console.log(response);
    } catch (error) {
      const errorMessage = error.response.data.message
      setError(errorMessage)
      setLoading(false)

    }
  };
  // console.log(error)
  return (
    <>
      <div className="mainContainer">
        <div className="signup">
          <h1 className="register">Sign in</h1>
          <div className="inputField">
            <InputField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              type={"text"}
              label={"Email"}
            />
            <InputField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              label={"Password"}
              type={"password"}
            />
        
          </div>
          {error && <p style={{color :"red", padding: "0px", margin: "0px"}}>{error}</p>}
          <div className="buttonBox">
          <button onClick={signin}
                className={`button ${loading ? "loadingbutton" : ""}`}
                disabled={loading}
              >
                {!loading && "Sign in"} {loading && "Signing in..."}
              </button>
            <p className="label">Don't have an account? <Link to={"/signup"} className="sign"> Sign up</Link></p>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Signin;
