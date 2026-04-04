import React, { memo } from "react";
import { Link, useNavigate } from "react-router";
import "./style.scss";
import { useAuth } from "../auth/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();

  const handleLogoutD = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <header className="app-header">
      {/* Left */}
      <div className="header-left" onClick={() => navigate("/")}>
        <h2>🚀 AI Interview</h2>
      </div>

      {/* Right */}
      <div className="header-right">

        {/* Show only if user exists */}
        {user ? (
          <>
            <Link to={`/dashboard/${user.id}`}>
              <button className="btn btn-secondary">Dashboard</button>
            </Link>

            <div className="user-box">
              <span className="username">{user.username}</span>

              <button onClick={handleLogoutD} className="btn btn-primary">
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="auth-buttons">
            <button className="btn btn-secondary">Login</button>
            <button className="btn btn-primary">Signup</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(Header);