import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let navigate = useNavigate();
  const handle = ()=>{
    if(!localStorage.getItem('token')){
      // alert("Please login first")
    props.showalert(" Login first", "danger");
    }
  }

  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
                aria-current="page"
                to="/home"
                onClick={handle}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handlelogout}
              role="button"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
