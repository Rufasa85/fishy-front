import React from 'react'
import {Link} from "react-router-dom"
import "./style.css";

export default function Navbar(props) {
    return (
        <div className = "NavBar">
              <h1>Hello</h1>
      <Link to="/">Home</Link>
      {props.userEmail ? (
        <div>

        <h2>Welcome to the club, {props.userEmail}</h2>
        <button onClick={props.logMeOut}>LogOut</button>
        </div>
      ) : (
        <form onSubmit={props.logMeIn}>
          <input value={props.loginInfo.email} onChange={props.handleInputChange} name="email"/>
          <input value={props.loginInfo.password} onChange={props.handleInputChange} name="password"/>
        <button >Login</button>
        </form>
      )}
        </div>
    )
}
