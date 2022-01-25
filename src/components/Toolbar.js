import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const Toolbar = () => {
  const { profile, handleLogin, handleLogout, error } = useContext(AuthContext);

  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const logo = (
    <div className="col">
      <h2>Neto Social</h2>
    </div>
  );

  useEffect(() => {
    if (error) {
      if (error.startsWith('401 ')) {
        handleLogout();
        return;
      }
      window.alert(error);
    }
  }, [error, handleLogout]);

  return (
    <>
      {profile && (
        <div className="container-fluid">
          <div className="row align-items-center">
            {logo}
            <div className="col-auto">Hello, {profile.name}</div>
            <div className="col-auto">
              <img
                className="rounded-circle"
                src={profile.avatar}
                alt={profile.name}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {!profile && (
        <div className="container-fluid">
          <div className="row align-items-center">
            {logo}
            <div className="col-auto">
              <input
                className="form-control"
                placeholder="Username"
                type="text"
                name="login"
                value={form.login}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-outline-success"
                onClick={() => handleLogin(form.login, form.password)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toolbar;
