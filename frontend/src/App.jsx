import './App.css'
import GetSingleEmployee from './GetSingleEmployee'
import AdminDashboard from './components/AdminDashboard'
import CreateEmployee from './components/CreateEmployee'
import EmployeeDashboard from './components/EmployeeDashboard'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
{/* <h1 className='logo'>Logo</h1> */}
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/dashboard' element={<AdminDashboard/>} />
          <Route path='/create-employee' element={<CreateEmployee/>}/>
          <Route path='/edit-employee/:id' element={<GetSingleEmployee/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
