import React,{Component}from "react";
import { variables } from "./Variable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";

export class Doctor extends Component{
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
      componentDidMount() {
        this.fetchDoctor();
      }
      fetchDoctor() {
        axios.get('https://localhost:5137/api/Doctor/Accepted status', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          params: {
            status: 'Admitted'
          }
        })
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
      
      //edit
      handledocIdInputChange = (event) => {
        this.setState({ docId: event.target.value });
      };
      uhandledocInputChange= (event) => {
        this.setState({ docName: event.target.value });
      };
      
      uhandleimageInputChange= (event) => {
        const file = event.target.files[0]; 
        this.setState({ docImg: file });
      };
      
      uhandlespecInputChange= (event) => {
        this.setState({ speciality: event.target.value });
      };
      
      uhandlegenderInputChange= (event) => {
        this.setState({ docGender: event.target.value });
      };
      
      uhandleexperiInputChange=(event) => {
        this.setState({ experience: event.target.value });
      };
      
      uhandlepassInputChange=(event) => {
        this.setState({ docPassword: event.target.value });
      };
      
      uhandlestatusInputChange=(event) => {
        this.setState({ status: event.target.value });
      };      
      uhandledocEmailInputChange=(event)=>{
        this.setState({docEmail : event.target.value});
      };
      uhandledocAgeInputChange=(event)=>{
        this.setState({docAge : event.target.value});
      };
      uhandledocDescriptionInputChange=(event)=>{
        this.setState({docDescription : event.target.value});
      };
      uhandledocPhoneNumberInputChange=(event)=>{
        this.setState({docPhoneNumber : event.target.value});
      };
      editItem = () => {
        const { docId,docName, speciality, docGender,experience,docPassword, docImg, docEmail, docAge, docDescription, docPhoneNumber  } = this.state;
      
        const formData = new FormData();
        formData.append('docId', docId);
        formData.append('docName', docName);
        formData.append('doc', 'doctor value'); 
        formData.append('speciality', speciality);
        formData.append('docGender', docGender);
        formData.append('experience', experience);
        formData.append('docPassword', docPassword);
        formData.append('imageFile', docImg);
        formData.append("docEmail", docEmail);
        formData.append("docAge", docAge);
        formData.append("docDescription", docDescription);
        formData.append("docPhoneNumber", docPhoneNumber);
      
        axios.put(variables.API_URL + `Doctor/${docId}`, formData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => response.data)
          .then((data) => {
            console.log('Doctor Updated:', data);
            this.fetchDoctor();
            this.setState({
              doctor_id: 0,
              docName: '',
              speciality: '',
              docGender: "",
              experience:0,
              docPassword:"",
              docImg: null,
              docEmail:"",
              docAge:0,
              docDescription:"",
              docPhoneNumber:0
            });
      
            // Update the image source
            const imageElement = document.getElementById('docImg');
            if (imageElement) {
              imageElement.src = data.docImg;
            }
          })
          .catch((error) => {
            console.error('Error Updating the Doctor:', error);
          });
      };
      deleteItem = (docId) => {
        fetch(variables.API_URL + `Doctor/${docId}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Doctor Deleted:", data);
            this.fetchDoctor();
          })
          .catch((error) => {
            console.error("Error Deleting the Doctor:", error);
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
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={() => { localStorage.removeItem("token") }}>
                      Logout
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
      <div className="row row-cols-1 row-cols-md-3 g-4">
                  {Doctor.map(doctor => (
                    <div key={doctor.docId} className="col">
                    
                      <div className="card my-bg-glass">
                      <br/>
                      <img
                  src={`https://localhost:5137/uploads/${doctor.docImg}`}
                  className="card-img-top "
                  alt=""
                  style={{
                    width: '200px',
                    height: '200px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />

                <div className="card-body">
            <h5 className="card-title">{doctor.docName}</h5>
            <div className="flex flex-wrap">
              <span className="inline-block w-1/2">
                <p className="text-sm text-gray-600">Specialization: {doctor.speciality}</p>
                <p className="text-sm text-gray-600">Gender: {doctor.docGender}</p>
              </span>
              <span className="inline-block w-1/2">
                <p className="text-sm text-gray-600">Experience: {doctor.experience} years</p>
                <p className="text-sm text-gray-600">docName: {doctor.docName}</p>
              </span>
            </div>
          </div>
          <div className="btn-group" role="group">
                <td> <button type="button"
                      className="btn btn"
                      onClick={() =>
                        this.setState({docId: doctor.docId, docName: doctor.docName,docImg:doctor.docImg,speciality:doctor.speciality,experience:doctor.experience,docGender:doctor.docGender,docEmail:doctor.docEmail,docAge:doctor.docAge,docPhoneNumber:doctor.docPhoneNumber,docDescription:doctor.docDescription,docImg:doctor.docImg })
                      }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg> </button> </td>
                  <td><button type="button"
                      className="btn btn" onClick={() => this.deleteItem(doctor.docId)}> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                          </svg></button></td>
                </div>
        </div>
      </div>
      
  ))}
  
</div>
      <div>
        <a href="/Registerdoc">Want to be doctor?</a>
      </div>
      {/*Edit start*/}
      <div className="card card-sm">
              <div className="card-body">
                <h5 className="card-title">Edit Doctor</h5>
                <div className="form-group">
                  <label htmlFor="doctor_id">Doctor Id:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="udocId"
                    value={docId}
                    onChange={this.handledocIdInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="docName">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="udocName"
                    value={docName}
                    onChange={this.uhandledocInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="docEmail">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="udocEmail"
                    value={docEmail}
                    onChange={this.uhandledocEmailInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="docPassword">Password:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="udocPassword"
                    value={docPassword}
                    onChange={this.uhandlepassInputChange}
                  />
                </div>
                <div className="form-group">
                <label htmlFor="docPassword">Age:</label>
            <input
              type="number"
              className="form-control"
              id="udocPassword"
              value={docAge}
              onChange={this.uhandledocAgeInputChange}
            />
            </div>  
            <div className="form-group">
                  <label htmlFor="docGender">Gender:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="udocGender"
                    value={docGender}
                    onChange={this.uhandlegenderInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="speciality">Specialization:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uspeciality"
                    value={speciality}
                    onChange={this.uhandlespecInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Experience:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="uexperience"
                    value={experience}
                    onChange={this.uhandleexperiInputChange}
                  />
                </div>
                <div className="form-group">
            <label htmlFor="experience">Contact Number:</label>
            <input
              type="number"
              className="form-control"
              id="udocPhoneNumber"
              value={docPhoneNumber}
              onChange={this.uhandledocPhoneNumberInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">About You:</label>
            <input
              type="text"
              className="form-control"
              id="udescription"
              value={docDescription}
              onChange={this.uhandledocDescriptionInputChange}
            />
          </div>
                <div className="form-group">
                  <label htmlFor="docImg">Picture:</label>
                  <input
                    type="file"
                    className="form-control"
                    id="docImg"
                    onChange={this.uhandleimageInputChange}
                  />
                </div>
                <br></br>
                {/* Button to trigger the editItem function */}
                <button className="btn btn-primary" onClick={this.editItem}>
                  Update Doctor
                </button>
              </div>
            </div>
      </div>
      </div>
        )
    }
}