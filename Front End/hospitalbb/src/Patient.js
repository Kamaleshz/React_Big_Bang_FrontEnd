import React, { Component } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export class Patient extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      Patient: [],
      Doctor:[],
      patId: 0,
      docId: 0,
      patName: "",
      age: 0,
      patGender: "",
      patIssue: "",
      patPhoneNumber: "",
      patient_Address: "",
      patEmail: "",
      patPassword: ""

    };
  }

  componentDidMount() {
    this.fetchPatients();
    this.fetchDoctor();
  }

  fetchPatients() {
    axios
      .get("https://localhost:5137/api/Patient", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const Patient = response.data;
        this.setState({ Patient});
      })
      .catch((error) => {
        console.error("Error fetching Patient:", error);
      });
  }
  fetchDoctor() {
    axios.get('https://localhost:5137/api/Doctor/Accepted status')
      .then((response) => {
        const data = response.data;
        const Doctor = data.map((Doctor) => {
          const { Patient, ...rest } = Doctor;
          return { ...rest, Patient };
        });
  
        this.setState({ Doctor });
      })
      .catch((error) => {
        console.error('Error fetching Doctors:', error);
      });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createPatient = () => {
    const {
      docId,
      patName,
      age,
      patGender,
      patIssue,
      patPhoneNumber,    
      patient_Address,
      patEmail,
      patPassword
    } = this.state;

    const patient = {
      docId,
      patName,
      age,
      patGender,
      patIssue,
      patPhoneNumber,
      patient_Address,
      patEmail,
      patPassword
    
    };
   

    axios
      .post("https://localhost:5137/api/Patient",patient, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log("Patient created:", response.data);
        this.fetchPatients();
        this.resetForm();
      })
      .catch((error) => {
        console.error("Error creating patient:", error);
      });
  };

  updatePatient = () => {
    const {
      patId,
      docId,
      patName,
      age,
      patGender,
      patIssue,
      patPhoneNumber,
      patEmail,
      patPassword
     
    } = this.state;

    const patient = {
      docId,
      patId,
      patName,
      age,
      patGender,
      patIssue,
      patPhoneNumber,
      patEmail,
      patPassword,
    };


    axios
      .put(`https://localhost:5137/api/Patient/${patId}`, patient, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log("Patient updated:", response.data);
        this.fetchPatients();
        this.resetForm();
      })
      .catch((error) => {
        console.error("Error updating patient:", error);
      });
  };

  deletePatient = (patId) => {
    axios
      .delete(`https://localhost:5137/api/Patient/${patId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log("Patient deleted:", response.data);
        this.fetchPatients();
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
      });
  };

  resetForm = () => {
    this.setState({
      patId: 0,
      docId: 0,
      doctor: null,
      patName: "",
      age: 0,
      patGender: "",
      patIssue:"",
      patPhoneNumber: "", 
      patEmail: "",
      patPassword: ""
      
    });
  };

  render() {
    const {
      Patient,
      patId,
      docId,
      patName,
      age,
      patGender,
      patIssue,
      patPhoneNumber,
      patEmail,
      patPassword
    
    } = this.state;

    const { Doctor } = this.state;

return (
  <div>
    <ToastContainer theme='colored'></ToastContainer>
    <header className="header_section" style={{ backgroundColor: "#02ab9a", color: '#fff' }}>
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
          <li className="nav-item">
            <Link className="nav-link" to="/GetByIdDoc">
              Getdoc
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
  <div className="container">
    <h5>Appointment and SignUp Form:</h5>
    <div>
      <form>
      <div className="mb-3">
          <label htmlFor="patName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="patName"
            name="patName"
            value={patName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={age}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patGender" className="form-label">
          Gender
          </label>
          <input
            type="text"
            className="form-control"
            id="patGender"
            name="patGender"
            value={patGender}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patIssue" className="form-label">
          Health Issue
          </label>
          <input
            type="text"
            className="form-control"
            id="patIssue"
            name="patIssue"
            value={patIssue}
            onChange={this.handleInputChange}
          />
        </div>
          <div className="mb-3">
          <label htmlFor="docId" className="form-label">
            Doctor
          </label>
          <select
            className="form-control"
            id="docId"
            name="docId"
            value={docId}
            onChange={this.handleInputChange}
          >
            <option value="">Select Doctor</option>
            {Doctor.map((doctor) => (
              <option key={doctor.docId} value={doctor.docId}>
                {doctor.docId} - {doctor.docName}
              </option>
            ))}
          </select>
          <a href="doctor">Find a doctor</a>
        </div>
        <div className="mb-3">
          <label htmlFor="patEmail" className="form-label">
          Email Id
          </label>
          <input
            type="text"
            className="form-control"
            id="patEmail"
            name="patEmail"
            value={patEmail}
            onChange={this.handleInputChange}
          />
        </div>
         <div className="mb-3">
          <label htmlFor="patPassword" className="form-label">
          Password
          </label>
          <input
            type="text"
            className="form-control"
            id="patPassword"
            name="patPassword"
            value={patPassword}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patPhoneNumber" className="form-label">
          Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            id="patPhoneNumber"
            name="patPhoneNumber"
            value={patPhoneNumber}
            onChange={this.handleInputChange}
          />
        </div>

        {patId === 0 ? (
          <button type="button" className="btn" onClick={this.createPatient} style={{ backgroundColor: "#02ab9a", color: '#fff' }}>
            Book
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={this.updatePatient}>
            Update Patient
          </button>
        )}

        <button type="button" className="btn" onClick={this.resetForm}>
          Cancel
        </button>
      </form>
    </div>
<div>
  <a href="/Registerpat">patient</a>
</div>
    <div>
      <h3>Patients List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Patient Id</th>
            <th>Patient Name</th>
            <th>Patient Age</th>
            <th>Gender</th>
            <th>Patient Issue</th>
            <th>Phone Number</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Patient.map((patient) => (
            <tr key={patient.patId}>
              <td>{patient.patId}</td>
              <td>{patient.patName}</td>
              <td>{patient.age}</td>
              <td>{patient.patGender}</td>
              <td>{patient.patIssue}</td>
              <td>{patient.patPhoneNumber}</td>
              <td>{patient.patEmail}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.deletePatient(patient.patId)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.setState(patient)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
);
}
}
