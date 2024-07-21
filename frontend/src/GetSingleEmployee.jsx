import React, { useEffect, useState } from 'react'
import axios from 'axios';
import api from './components/Instances/api';
import { useParams } from 'react-router-dom';
import EditEmployee from './components/EditEmployee';

function GetSingleEmployee() {

  // Get Employee
  const [ singleEmployee, setSingleEmployee ] = useState({});
  const [ hasData, setHasData ] = useState(false)
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  const getEmployee = async () => {
    const response = await axios.get(`https://employee-dashboard-backend-iota.vercel.app/api/v1/employee/get-employee/${id}`)
    const employee = await response.data.data;
    console.log(employee)
    setSingleEmployee(employee)
    setHasData(true)

};

useEffect(()=>{
  setTimeout(() => {
  getEmployee();
  }, 500);
},[])
  return (
    <>
    {hasData && 
    <EditEmployee singleEmployee={singleEmployee} id={id}/>
    }
    {!hasData && <p>Loading...</p>}
    </>
  )
}

export default GetSingleEmployee
