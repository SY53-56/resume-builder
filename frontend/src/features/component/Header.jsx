import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
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
    
        <Link to={`/dashboard/${user.id}`}><button className="logout-btn">Dashboard</button></Link>
         {user ? <div className="btn-box">
          <h1>{user.username}</h1>
          <button onClick={handleLogoutD} className="logout-btn">
          Logout
        </button>
         </div>:<div>
   
          <button className="logout-btn">login </button>
            <button  className="logout-btn">signup </button>
          </div>}
      </div>
    </header>
  );
};

export default Header;