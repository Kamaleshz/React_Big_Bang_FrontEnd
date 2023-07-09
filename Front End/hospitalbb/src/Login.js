import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('user'); // Default role is "user"

  const navigate = useNavigate();

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();

    const apiUrl = role === 'user' ? 'https://localhost:5137/api/Token/Patients' : 'https://localhost:5137/api/Token/Doctor';

    const inputObj = {
      patEmail: userName,
      patPassword: password,
    };

    const inputObj2 = {
      docEmail: userName,
      docPassword: password,
    };

    const input = role === 'user' ? inputObj : inputObj2;
    if (role !== 'user') {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Return the response as JSON
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((data) => {
        if (data !== 'Invalid credentials') {
          const { token, doctor } = data;
          alert('Success');

          localStorage.setItem('token', token);
          localStorage.setItem('docId', doctor);

          if (role === 'user') {
            navigate('/GetByIdPat'); // Redirect to the "/cake" route after successful user login
          } else if (role === 'admin') {
            navigate('/GetByIdDoc'); // Redirect to the "/customers" route after successful admin login
          }
        } else {
          toast.error('Invalid credentials');
        }
      })
      .catch((err) => {
        toast.error('Login Failed due to: ' + err.message);
      });
  }

  else {
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Return the response as JSON
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((resp) => {
        if (resp !== 'Invalid credentials') {
          const { token, patient } = resp;

          localStorage.setItem('token', token);
          localStorage.setItem('patId', patient);
         

          if (role === 'user') {
            navigate('/GetByIdPat');
          } else if (role === 'admin') {
            alert('logged in');
            navigate('/GetByIDoc');
          }
        } else {
          toast.error('Invalid credentials');
        }
      })
      .catch((err) => {
        toast.error('Login Failed due to: ' + err.message);
      });
  }
};
    
  return (

    <div    className="login-page" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?w=1380&t=st=1688509915~exp=1688510515~hmac=ff6db384c5000e31d9390c56ea3dd1d81e94b60fb7a925331de6e8afded83c7f")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
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
    <div className="row justify-content-center" >
      <div className="container">
  <div className="row justify-content-center" style={{ marginTop: '100px' }}>
    <div className="col-lg-4" >
      <form onSubmit={proceedLoginUsingAPI}>
        <div className="card">
          <h5 className="text-center">Login Page</h5>
          <div className="card-body">
            <div className="form-group">
              <label style={{ color: '#333333' }}>Email <span className="errmsg">*</span></label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                style={{ borderColor: '#FFC107' }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: '#333333' }}>Password <span className="errmsg">*</span></label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                style={{ borderColor: '#FFC107' }}
              />
            </div>
            
            <div className="form-group">
              <label style={{ color: '#333333' }}>Role <span className="errmsg">*</span></label>
              <div className="form-check">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="form-check-input"
                />
                <label className="form-check-label">Patient</label>
              </div>
              <div className="form-check">
                <input 
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="form-check-input"
                />
                <label className="form-check-label">Doctor</label>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#02ab9a", color: '#fff' }}>
              Login
            </button>
            <br></br>
            <a href='Registerdoc'>Doctor SignUp</a> | <a href="/Registerpat">Patient SignUp</a>
            
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
    </div>
  );
}