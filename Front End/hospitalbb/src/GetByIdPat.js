import React, { Component } from "react";
import axios from "axios";
import { variables } from "./Variable";
import { Link } from "react-router-dom";

class PatientById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patId: "",
      patient: null,
      error: null,
    };
  }

  componentDidMount() {
   
      this.fetchPatientById();
    }
  

  fetchPatientById = () => {
    const patId = localStorage.getItem("patId");

    axios
      .get(`https://localhost:5137/api/Patient/${patId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const patient = response.data;
        this.setState({ patient });
      })
      .catch((error) => {
        console.error("Error fetching patient by ID:", error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { patId } = this.state;
    localStorage.setItem("patId", patId);
    this.fetchPatientById(patId);
  };

  handleInputChange = (event) => {
    this.setState({ patId: event.target.value });
  };

  render() {
    const { patient } = this.state;

    return (
        <div className="container">
        <h2>patient Details</h2>

        {patient ? (
          <table className="table">
            <thead>
              <tr>
                <th>patient Name</th>
                <th>Age</th>
                <th>Issue</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{patient.patName}</td>
                <td>{patient.age}</td>
                <td>{patient.patIssue}</td>
                <td>{patient.patGender}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading patient details...</p>
        )}
        <Link className="btn btn-primary"to={'/login'} style={{ backgroundColor: '#1976d2' }} onClick={() => { localStorage.clear(); }}>
            Logout
          </Link>
      </div>
    );
  }
}

export default PatientById;