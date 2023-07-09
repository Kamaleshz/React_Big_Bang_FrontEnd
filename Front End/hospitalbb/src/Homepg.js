import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Home.css';
import './Responsive.css'
import hero from './Images/hero-bg.png';

export default function Homepg() {
  return (
    <div>
      <div className="hero_area">
      <div className="hero_bg_box" style={{
  backgroundImage: `url(${hero})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
}}>

<div className="container hey" style={{
  position: "relative",
  top: "-180px"
}}>
  <div className="row">
    <div className="col-md-5">
      <div className="detail-box">
        <h1>We Provide Best Healthcare</h1>
        <p>
        Welcome to our hospital, where compassionate care meets cutting-edge technology to provide exceptional healthcare services
        </p>
      </div>
    </div>
  </div>
</div>

        </div>

        {/* header section starts */}
        <header className="header_section">
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <Link className="navbar-brand" to="/">
                <span>Orthoc</span>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span> </span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Registerpat">
                      Appointment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctors">
                      Doctors
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Admin">
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        {/* end header section */}
      </div>
    </div>
  );
}
