import React, { Component } from "react";
import axios from "axios";
import { variables } from "./Variable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

class Doctorid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: null,
    };
  }

  componentDidMount() {
    this.getDoctorById();
  }

  getDoctorById = () => {
    const docId = localStorage.getItem("docId");

    axios
      .get(`${variables.API_URL}Doctor/${docId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const doctor = response.data;
        this.setState({ doctor });
      })
      .catch((error) => {
        console.error("Error fetching Doctor by ID:", error);
      });
  };

  render() {
    const { doctor } = this.state;

    return (
      <div className="container">
        <h2>Doctor Details</h2>

        {doctor ? (
          <table className="table">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Gender</th>
                <th>Experience</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{doctor.docName}</td>
                <td>{doctor.speciality}</td>
                <td>{doctor.docGender}</td>
                <td>{doctor.experience}</td>
                <td>{doctor.status}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading doctor details...</p>
        )}
<Link className="btn btn-primary"to={'/login'} style={{ backgroundColor: '#1976d2' }} onClick={() => { localStorage.removeItem("token") }}>
            Logout
          </Link>
      </div>
    );
  }
}

export default Doctorid;