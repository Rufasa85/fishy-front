import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import API from "./utils/API"
import Home from "./pages/Home";
import TankDetail from "./pages/TankDetail";
import Navbar from "./components/Navbar";
function App() {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");

  const [loginInfo, setLoginInfo] = useState({
    email:"",
    password:""
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.getTokenData(token)
        .then(data => {
          console.log(data);
          setUserId(data.id);
          setUserEmail(data.email);
          setToken(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const logMeIn = (e) => {
    e.preventDefault()
    API.login()
      .then(data => {
        console.log(data);
        setUserId(data.user.id);
        setUserEmail(data.user.email);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }).catch(err=>{
        console.log(err);
      });
  };

  const logMeOut = ()=>{
    localStorage.removeItem("token");
    setUserId(0);
    setUserEmail("");
    setToken("");
  }

  const handleInputChange = e=>{
    console.log(e.target.name,e.target.value)
    setLoginInfo({
      ...loginInfo,
      [e.target.name]:e.target.value
    })
  }

  return (
    <>
      <Router>
        <Navbar logMeOut={logMeOut} logMeIn={logMeIn} userEmail={userEmail} loginInfo={loginInfo} handleInputChange={handleInputChange}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tanks/:id" element={<TankDetail/>}/>
        </Routes>
        </Router>
    </>
  );
}

export default App;
