import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/style.scss";
import { useUser } from "../../context/contextUser";

const Header = () => {
  const { user, roles, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/Patients">Patients</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/doctorAppointments">Doctor Appointments</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
