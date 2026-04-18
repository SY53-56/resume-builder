import React, { useCallback, useContext, useEffect } from "react";
import "../style/dashboard.css";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { AuthContext } from "../../auth/auth.context";
import { toast } from "react-toastify";
import Footer from "../../component/Footer";
export default function Dashboard() {
  const { getReportsbyUserId, loading, reports = [],deleteGenerateReportById } = useInterview();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      getReportsbyUserId(user.id);
    }
  }, [user?.id, getReportsbyUserId]);

 const handleDeleteReports = useCallback(async (e,id) => {

    e.stopPropagation(); 
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  await deleteGenerateReportById(id);
  toast.success("delete successfully")
}, [deleteGenerateReportById]);
  if (loading) {
    return (
      <section className="dash-section">
        <h2>Loading dashboard...</h2>
      </section>
    );
  }

  return (
    <>
    <section className="dash-section">
      <div className="dash-container">

        {/* Header */}
        <div className="dash-header">
          <h1>Your Interviews</h1>
          <p>Track and revisit your generated interview plans</p>
        </div>

        {/* Empty state */}
        {reports.length === 0 && (
          <div className="empty-state">
            <p>No interviews yet</p>
          </div>
        )}

        {/* List */}
        <div className="interview-grid">
          {reports.map((item) => (
            <div    
              key={item._id}
              className="interview-card"
              onClick={() => navigate(`/interview/${item._id}`)}
            >
              <div className="card-header">
                <h3>{item.title || "Untitled Role"}</h3>
                <span className="score">{item.matchScore}%</span>
              </div>

              <p className="card-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <div className="card-footer">
                <span>View Report →</span>
                <button onClick={(e)=>handleDeleteReports( e,item._id)} className="delete-btn">delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
}