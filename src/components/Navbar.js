import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = async () =>{
    await localStorage.removeItem('token');
    navigate("/login")
    
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'rgb(68 23 116)'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NoteDown</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.path === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.path === "/about" ? "active" : ""}`} to="/about">About</Link>
        </li>
      </ul>
      {!(localStorage.getItem('token')) ? <form className="d-flex">
      <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-outline-info mx-2" to="/signup" role="button">SignUp</Link>
      </form> : <Link className="btn btn-outline-info mx-2" onClick={handleLogout} role="button">Logout</Link>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
