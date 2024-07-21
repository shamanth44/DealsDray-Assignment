import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Signout from "./Signout";
import axios from "axios";

function Navbar() {

  const [ hasData, setHasData ] = useState(false);
  const [admin, setAdmin] = useState({});
  const getAdmin = async () => {
    const response = await axios.get("https://deals-dray-assignment.vercel.app/api/v1/admin/get-admin")
    const adminData = await response.data.data
    setAdmin(adminData)
    setHasData(true)
  }
  useEffect(() => {
    getAdmin();
  }, []); 

  return (
    <div className="navbar">
      <div className="logo">
        <Link className="dashboard" to={"/dashboard"}>
        <h1>My Dashboard</h1>
        </Link>
      </div>
      <div className="navitemsRight">
        {hasData && <p style={{color: "black", margin:"0px"}}>Welcome {admin.name}</p>}
        <div className="adminImage"><img src={admin.image}  /></div>
        {/* <Link className="dashboard" to={"/dashboard"}>Employee List</Link> */}
        <Signout />
      </div>
    </div>
  );
}

export default Navbar;
