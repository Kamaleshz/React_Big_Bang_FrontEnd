import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  useEffect(() => {
    fetch('https://localhost:5137/api/Doctor/Accepted status',{
      method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.log(error));
  }, []);

  const filterOptions = ['Neurology', 'Ophthalmology', 'Dermatology', 'Orthodontics'];

  const handleFilterSelection = (event) => {
    setSelectedSpeciality(event.target.value);
  };

  const filteredDoctors = selectedSpeciality
    ? doctors.filter(doctor => doctor.speciality === selectedSpeciality)
    : doctors;

  return (
    <div style={{backgroundColor: 'ButtonShadow'}}>
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
      <div style={{ position: 'absolute', top: '15px', left: '10px' }}>
  
</div>
    <div className="container" >
    <br/>
    <div className="row">
      <div className="col">
        <div className="mb-4">
          <label htmlFor="specialityFilter" className="form-label">
            Filter by Speciality:
          </label>
          <select
            id="specialityFilter"
            className="form-select form-select-sm"
            value={selectedSpeciality}
            onChange={handleFilterSelection}
          >
            <option value="">All Specialities</option>
            {filterOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
      {filteredDoctors.map(doctor => (
        <div key={doctor.doctorId} className="col">
          <div
            className="card my-bg-glass doctor-card"
            style={{
              borderRadius: '10px',
              transition: 'box-shadow 0.5s ease',
            }}
            onMouseEnter={e => {
              e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={e => {
              e.target.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div
              className="doctor-img-wrapper"
              style={{
                overflow: 'hidden',
                borderRadius: '50%',
                width: '200px',
                height: '200px',
                margin: '20px auto 0',
              }}
            >
              <img
                  src={`https://localhost:5137/uploads/${doctor.docImg}`}
                  className="card-img-top img-fluid"
                alt="Doctor"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  transform: 'scale(1.3)',
                }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{doctor.docName}</h5>
              <div>
                <p className="card-text">
                  Specialization: {doctor.speciality}<br />
                  Gender: {doctor.docGender}<br />
                  Email: {doctor.docEmail}<br />
                  Experience: {doctor.experience} years<br />
                  Description: {doctor.docDescription}<br />
                  Phone Number: {doctor.docPhoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <p>
      Want to become a doctor? <Link to="/Registerdoc">Click here</Link>
    </p>
  </div>
  <br/>
  
  </div>
  );
}

export default Doctors;