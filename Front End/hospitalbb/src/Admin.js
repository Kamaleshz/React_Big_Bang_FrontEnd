import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default function Admin() {
  const [adminPassword, setPassword] = useState('');
  const [adminName, setUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = {
        adminName: adminName,
        adminPassword: adminPassword,
      };
      fetch('https://localhost:5137/api/Token/Admin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Invalid credentials');
          }
          return res.text();
        })
        .then((resp) => {
          console.log(resp);
          toast.success('Success');
          localStorage.setItem('token', resp);
          navigate('/AdminPage');
        })
        .catch((err) => {
          toast.error('Login Failed due to: ' + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (adminName === '' || adminName === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (adminPassword === '' || adminPassword === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <div>
    <ToastContainer theme='colored'></ToastContainer>
    <header className="header_section" style={{ backgroundColor: "#02ab9a", color: '#fff' }}>
  <div className="container">
    <nav className="navbar navbar-expand-lg custom_nav-container">
      <Link className="navbar-brand" to="/">
        <span>Orthoc</span>
      </Link>
    </nav>
  </div>
</header>
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <form onSubmit={proceedLoginUsingAPI} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Admin Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Email <span className="errmsg">*</span>
                </label>
                <input
                  value={adminName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn" style={{ backgroundColor: "#02ab9a", color: '#fff' }}>
                Login
              </button>&nbsp;
              <Link className="btn btn-success"  disabled>
                  New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
