import React, { Component } from "react";
import axios from "axios";
import { variables } from "./Variable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export class Registerpat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Patient: [],
      Doctor: [],
      patId: 0,
      docId: 0,
      doctors: null,
      patName: "",
      age: 0,
      patGender: "",
      patIssue: "",
      patPhoneNumber: "",
      patient_Address: "",
      patEmail: "",
      patPassword: "",
      validation: {
        patName: true,
        age: true,
        patGender: true,
        patIssue: true,
        docId: true,
        patEmail: true,
        patPassword: true,
        patPhoneNumber: true
      }
    };
  }

  componentDidMount() {
    this.fetchDoctor();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      [name]: value,
      validation: {
        ...prevState.validation,
        [name]: Boolean(value) // Update validation status based on whether the value is present or not
      }
    }));
  };

  createPatient = () => {
    const {
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
      patName,
      age,
      patGender,
      patIssue,
      patPhoneNumber,
      patEmail,
      patPassword
    };

    // Check if all fields are valid
    const isFormValid = Object.values(this.state.validation).every((valid) => valid);

    if (isFormValid) {
      axios
        .post("https://localhost:5137/api/Patient", patient)
        .then((response) => {
          console.log("Patient created:", response.data);
          this.resetForm();
          toast.success("Patient created successfully.");
        })
        .catch((error) => {
          console.error("Error creating patient:", error);
          toast.error("Error creating patient.");
        });
    } else {
      console.error("Form validation failed.");
      toast.error("Please fill in all the required fields.");
    }
  };

  resetForm = () => {
    this.setState({
      patId: 0,
      docId: 0,
      doctor: null,
      patName: "",
      age: 0,
      patGender: "",
      patIssue: "",
      patPhoneNumber: "",
      patEmail: "",
      patPassword: "",
      validation: {
        patName: true,
        age: true,
        patGender: true,
        patIssue: true,
        docId: true,
        patEmail: true,
        patPassword: true,
        patPhoneNumber: true
      }
    });
  };

  fetchDoctor() {
    axios
      .get("https://localhost:5137/api/Doctor/Accepted status")
      .then((response) => {
        const data = response.data;
        const Doctor = data.map((Doctor) => {
          const { Patient, ...rest } = Doctor;
          return { ...rest, Patient };
        });

        this.setState({ Doctor });
      })
      .catch((error) => {
        console.error("Error fetching Doctors:", error);
      });
  }

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
      patPassword,
      validation
    } = this.state;

    const { Doctor } = this.state;

    return (
      <div>
        <ToastContainer theme="colored"></ToastContainer>
        <header
          className="header_section"
          style={{ backgroundColor: "#02ab9a", color: "#fff" }}
        >
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
            </nav>
          </div>
        </header>
        <div
          className="container"
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?w=1380&t=st=1688509915~exp=1688510515~hmac=ff6db384c5000e31d9390c56ea3dd1d81e94b60fb7a925331de6e8afded83c7f")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backdropFilter: "blur(15px)",
            minHeight: "100vh",
            minWidth: "100%"
          }}
        >
          <div className="row justify-content-center">
            <div
              className="row justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <div className="col-lg-4">
                <div className="card">
                  <h5 className="text-center">Appointment and SignUp Form</h5>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="patName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          validation.patName ? "" : "is-invalid"
                        }`}
                        id="patName"
                        name="patName"
                        value={patName}
                        onChange={this.handleInputChange}
                      />
                      {!validation.patName && (
                        <div className="invalid-feedback">
                          Please enter a name.
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Age
                      </label>
                      <input
                        type="number"
                        className={`form-control ${
                          validation.age ? "" : "is-invalid"
                        }`}
                        id="age"
                        name="age"
                        value={age}
                        onChange={this.handleInputChange}
                      />
                      {!validation.age && (
                        <div className="invalid-feedback">
                          Please enter a valid age.
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patGender" className="form-label">
                        Gender
                      </label>
                      <div>
                        <label className="radio-inline mr-2">
                          <input
                            type="radio"
                            name="patGender"
                            value="Male"
                            checked={patGender === "Male"}
                            onChange={this.handleInputChange}
                          />{" "}
                          Male
                        </label>
                        <label className="radio-inline">
                          <input
                            type="radio"
                            name="patGender"
                            value="Female"
                            checked={patGender === "Female"}
                            onChange={this.handleInputChange}
                          />{" "}
                          Female
                        </label>
                      </div>
                      {!validation.patGender && (
                        <div className="invalid-feedback">
                          Please select a gender.
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patIssue" className="form-label">
                        Issue
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          validation.patIssue ? "" : "is-invalid"
                        }`}
                        id="patIssue"
                        name="patIssue"
                        value={patIssue}
                        onChange={this.handleInputChange}
                      />
                      {!validation.patIssue && (
                        <div className="invalid-feedback">
                          Please enter an issue.
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="docId" className="form-label">
                        Select Doctor
                      </label>
                      <select
                        className={`form-control ${
                          validation.docId ? "" : "is-invalid"
                        }`}
                        id="docId"
                        name="docId"
                        value={docId}
                        onChange={this.handleInputChange}
                      >
                        <option value={0}>-- Select --</option>
                        {Doctor &&
                          Doctor.map((doctor) => (
                            <option key={doctor.docId} value={doctor.docId}>
                              {doctor.docName}
                            </option>
                          ))}
                      </select>
                      {!validation.docId && (
                        <div className="invalid-feedback">
                          Please select a doctor.
                        </div>
                      )}
                      <a href='doctors'>Find Doctor</a>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patPhoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          validation.patPhoneNumber ? "" : "is-invalid"
                        }`}
                        id="patPhoneNumber"
                        name="patPhoneNumber"
                        value={patPhoneNumber}
                        onChange={this.handleInputChange}
                      />
                      {!validation.patPhoneNumber && (
                        <div className="invalid-feedback">
                          Please enter a valid phone number.
                        </div>
                      )}
                    </div>
                   
                    <div className="mb-3">
                      <label htmlFor="patEmail" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          validation.patEmail ? "" : "is-invalid"
                        }`}
                        id="patEmail"
                        name="patEmail"
                        value={patEmail}
                        onChange={this.handleInputChange}
                      />
                      {!validation.patEmail && (
                        <div className="invalid-feedback">
                          Please enter a valid email.
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${
                          validation.patPassword ? "" : "is-invalid"
                        }`}
                        id="patPassword"
                        name="patPassword"
                        value={patPassword}
                        onChange={this.handleInputChange}
                      />
                      {!validation.patPassword && (
                        <div className="invalid-feedback">
                          Please enter a password.
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.createPatient}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger ml-2"
                        onClick={this.resetForm}
                      >
                        Reset
                      </button>
                      <br></br>
                      <a href='/Login'>Login Page</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registerpat;
