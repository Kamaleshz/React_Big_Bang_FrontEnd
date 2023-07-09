import React,{Component}from "react";
import { variables } from "./Variable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Link, Navigate } from "react-router-dom";

export class Registerdoc extends Component{
    constructor(props) {
        super(props);
        this.state = {
          Doctor: [],
          docName:"",
          docEmail:"",
          docPassword: "",
          speciality: "",
          docAge: 0,
          docGender: "",
          docDescription: "",
          experience: 0,
          docPhoneNumber: 0,
          docImg: "",
          status: "",
          docId: 0,
        };
      }
      handledocInputChange= (event) => {
        this.setState({ docName: event.target.value });
      };
      
      handleimageInputChange= (event) => {
        const file = event.target.files[0]; 
        this.setState({ docImg: file });
      };
      
      handlespecInputChange= (event) => {
        this.setState({ speciality: event.target.value });
      };
      
      handlegenderInputChange= (event) => {
        this.setState({ docGender: event.target.value });
      };
      
      handleexperiInputChange=(event) => {
        this.setState({ experience: event.target.value });
      };
      
      handlepassInputChange=(event) => {
        this.setState({ docPassword: event.target.value });
      };
      
      handlestatusInputChange=(event) => {
        this.setState({ status: event.target.value });
      };      
      handledocEmailInputChange=(event)=>{
        this.setState({docEmail : event.target.value})
      }
      handledocAgeInputChange=(event)=>{
        this.setState({docAge : event.target.value})
      }
      handledocDescriptionInputChange=(event)=>{
        this.setState({docDescription : event.target.value})
      }
      handledocPhoneNumberInputChange=(event)=>{
        this.setState({docPhoneNumber : event.target.value})
      }

      createItem = () => {
        const { docName, speciality, docGender,experience,docPassword, docImg, docEmail, docAge, docDescription, docPhoneNumber } = this.state;
        const formData = new FormData();
        formData.append("docName", docName);
        formData.append("speciality", speciality);
        formData.append("docGender", docGender);
        formData.append("experience", experience);
        formData.append("docPassword", docPassword);
        formData.append("imageFile", docImg);
        formData.append("docEmail", docEmail);
        formData.append("docAge", docAge);
        formData.append("docDescription", docDescription);
        formData.append("docPhoneNumber", docPhoneNumber);
      
        fetch("https://localhost:5137/api/Doctor", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create the cake. HTTP status " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Doctor Created:", data);
            this.fetchDoctor();
            this.setState({
              docName: "",
              speciality: "",
              experience: 0,
              docGender:"",
              docPassword:"",
              docImg: null,
              docEmail:"",
              docAge:0,
              docDescription:"",
              docPhoneNumber:0
            });
          })
          .catch((error) => {
            console.error("Error Creating the Doctor:", error);
          });
      };
      render(){
        const {
            docId,
            Doctor,
            docImg,
            docName,
            speciality,
            docGender,
            experience,
            docPassword,
            status,
            docEmail,
            docAge,
            docDescription,
            docPhoneNumber
           
          } = this.state;
     return(
      <div>
      <ToastContainer theme='colored'></ToastContainer>
      <header className="header_section" style={{ backgroundColor: "#3d95ba", color: '#fff' }}>
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
        <ul className="navbar-nav ml-auto"> {/* Added ml-auto class for right alignment */}
          <li className="nav-item active">
            <Link className="nav-link" to="/doctor">
              Doctors
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/patient">
              Patient
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Admin">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <form className="form-inline">
            <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </ul>
      </div>
    </nav>
  </div>
</header>
      <div className="container" style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/185895.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
      <div className="row justify-content-center" >
  <div className="row justify-content-center" style={{ marginTop: '100px' }}>
    <div className="col-lg-4" >
    <div className="card">
          <h5 className="text-center">Create New Doctor</h5>
          <div className="card-body">
          <div className="form-group">
            <label htmlFor="docName">Name:</label>
            <input
              type="text"
              className="form-control"
              id="docName"
              value={docName}
              onChange={this.handledocInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="docEmail">Email:</label>
            <input
              type="text"
              className="form-control"
              id="docEmail"
              value={docEmail}
              onChange={this.handledocEmailInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="docPassword">Password:</label>
            <input
              type="password"
              className="form-control"
              id="docPassword"
              value={docPassword}
              onChange={this.handlepassInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="docPassword">Age:</label>
            <input
              type="number"
              className="form-control"
              id="docPassword"
              value={docAge}
              onChange={this.handledocAgeInputChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="docGender">Gender:</label>
            <input
              type="text"
              className="form-control"
              id="docGender"
              value={docGender}
              onChange={this.handlegenderInputChange}
            />
          </div>
            <div className="form-group">
            <label htmlFor="speciality">Specialization</label>
            <input
              type="text"
              className="form-control"
              id="speciality"
              value={speciality}
              onChange={this.handlespecInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience:</label>
            <input
              type="number"
              className="form-control"
              id="experience"
              value={experience}
              onChange={this.handleexperiInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Contact Number:</label>
            <input
              type="number"
              className="form-control"
              id="experience"
              value={docPhoneNumber}
              onChange={this.handledocPhoneNumberInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">About You:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={docDescription}
              onChange={this.handledocDescriptionInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="docImg">Picture:</label>
            <input
              type="file"
              className="form-control"
              id="docImg"
              onChange={this.handleimageInputChange}
            />
          </div>
          <br></br>
          <Link className="btn"to={'/login'} style={{ backgroundColor: '#3d95ba' }} onClick={this.createItem}>
            Register
          </Link>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  )
}
}
