import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPage() {

  const [activeSection, setActiveSection] = useState('content');
  const [doctors, setDoctors] = useState([]);
  const [notApprovedDoctors, setNotApprovedDoctors] = useState([]);

  useEffect(() => {
    fetchApprovedDoctors();
    fetchNotApprovedDoctors();

  }, []);


  const fetchApprovedDoctors=()=>{
    fetch('https://localhost:5137/api/Doctor/Accepted status', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(
        data => setDoctors(data),
        console.log(doctors))
      .catch(error => console.log(error));
  }

const fetchNotApprovedDoctors=()=>{
  fetch('https://localhost:5137/api/Doctor/Requested status', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
      .then(response => response.json())
      .then(data => setNotApprovedDoctors(data))
      .catch(error => console.log(error));
  }

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  

  return (
    <>
     <header className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "grey", color: "#fff" }}>
    <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-1 mb-lg-0 justify-content-center">
      <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/Homepg" style={{ color: "#fff", fontSize: "16px" }}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => handleSectionClick('doctors')} style={{ color: "#fff", fontSize: "16px" }}>Requested Doctors</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href='/doctor' onClick={() => handleSectionClick('getDoctors')} style={{ color: "#fff", fontSize: "16px" }}>Activated Doctors</a>
        </li>
       
      </ul>
      <span className="navbar-text me-2" onClick={() => { localStorage.removeItem("token") }} style={{ color: "#fff", fontSize: "16px", border: "1px solid #fff", padding: "5px 10px", borderRadius: "4px" }}>Logout</span>
    </div>
  </div>
</header>
      {activeSection === 'content' && (
        <div className="content">
          <div className="context">
            <h1>Welcome admin!!</h1>
          </div>
        </div>
      )}
  
      {activeSection === 'doctors' && (
        <div className="doctors">
          <section className="my-background-radial-gradient overflow-hidden">
            <div className="my-doctors-container container">
              <div className="my-page-heading">
                <h2>Requested Doctors</h2>
                <hr />
              </div>
              <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {notApprovedDoctors.map(doctor => (
                    <div key={doctor.docId} className="col">
                      <div className="card my-bg-glass">
                        <div className="card-body">
                        <img
                          src={`https://localhost:5137/uploads/${doctor.docImg}`}
                          className="card-img-top"
                          alt=""
                          style={{ width: '200px', height: '200px' }}/>

                        <div className="flex flex-wrap">
                          <br/>
                        <span className="inline-block w-1/2">
                        <p className="text-sm text-gray-600">Name: {doctor.docName}</p>
                          <p className="text-sm text-gray-600">Specialization: {doctor.speciality}</p>
                          <p className="text-sm text-gray-600">Gender: {doctor.docGender}</p>
                        </span>
                        <span className="inline-block w-1/2">
                          <p className="text-sm text-gray-600">Experience: {doctor.experience} years</p>
                          <p className="text-sm text-gray-600">docName: {doctor.docName}</p>
                          <p className="text-sm text-gray-600">Status: {doctor.status}</p>
                        </span>
                      </div><hr/>
                          
                          <div className="d-flex justify-content-center">
                          
                            <button type="button" className="btn btn-success me-2" onClick={() =>{
                              const requestBody = {
                              "id": doctor.docId
                              };
                              console.log(requestBody);

                              fetch("https://localhost:5137/api/Doctor/Update status", {
                              method: "PUT",
                              headers: {
                                  "Accept": "application/json",
                                  "Content-Type": "application/json",
                                  Authorization: 'Bearer ' + localStorage.getItem('token')

                              },
                              body: JSON.stringify(requestBody)
                              })
                              .then(response => response.json())
                              .then(data => {
                              console.log(data); 
                              fetchNotApprovedDoctors();
                              fetchApprovedDoctors();
                              })
                              .catch(error => console.log(error));
                          }}>Accept</button>


                            <button type="button" className="btn btn-danger" onClick={() =>{
                              const requestBody = {
                                "id": doctor.docId
                              };
                              console.log(requestBody);

                              fetch("https://localhost:5137/api/Doctor/Decline Doctor", {
                              method: "PUT",
                              headers: {
                                  "Accept": "application/json",
                                  "Content-Type": "application/json",
                                  Authorization: 'Bearer ' + localStorage.getItem('token')
                              },
                              body: JSON.stringify(requestBody)
                              })
                              .then(response => response.json())
                              .then(data => {
                              console.log(data); 
                              fetchNotApprovedDoctors();
                              fetchApprovedDoctors();
                              })
                              .catch(error => console.log(error));
                          }}>Decline</button>


                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </div>
      )}
  
      {activeSection === 'getDoctors' && (
        <div className="getDoctors">
          <section className="my-background-radial-gradient overflow-hidden">
            <div className="my-doctors-container container">
              <div className="my-page-heading">
                <h2>Activated Doctors</h2>
                <hr/>
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                  {doctors.map(doctor => (
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
                <p className="text-sm text-gray-600">Status: {doctor.status}</p>
              </span>
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
          
        </div>
      </div>   
  ))}
</div>
            </div>
          </section>
        </div>
      )}
    </>
  );  
}

export default AdminPage;