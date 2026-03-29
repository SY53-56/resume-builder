import React, { useContext } from "react";
import { useNavigate } from "react-router";
import "./style.scss"
import { AuthContext } from "../auth/auth.context";
import { useAuth } from "../auth/hooks/useAuth";
const Header = () => {
  const navigate = useNavigate();
const {handleLogout, user}= useAuth()
console.log( "sahul",user)
  const handleLogoutD = async() => {
   await  handleLogout()
    navigate("/");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          🚀 AI Interview
        </h2>
      </div>

      <div className="header-right">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
         {user ?  <button onClick={handleLogoutD} className="logout-btn">
          Logout
        </button>:<div>

          <button className="logout-btn">login </button>
            <button  className="logout-btn">signup </button>
          </div>}
      </div>
    </header>
  );
};

export default Header;