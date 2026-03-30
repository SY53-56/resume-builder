
import React, { useContext, useEffect } from 'react'
import "../style/dashboard.scss"
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../auth/auth.context'


export default function Dashboard() {
  const { interviews, getReportById, getReportsbyUserId, loading,report, reports,  } = useInterview()
  const {user}= useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
   getReportsbyUserId(user?.id)
  }, [user?.id])

  console.log( "reposrt data sahul",reports)
  console.log("userdatasahul", user)

  if (loading) {
    return (
      <section className='dash-section'>
        <h2>Loading dashboard...</h2>
      </section>
    )
  }

  return (
    <section className='dash-section'>
      <div className='dash-container'>

        {/* Header */}
        <div className='dash-header'>
          <h1>Your Interviews</h1>
          <p>Track and revisit your generated interview plans</p>
        </div>

        {/* Empty state */}
        {!interviews?.length && (
          <div className='empty-state'>
            <p>No interviews yet</p>
          </div>
        )}

        {/* List */}
        <div className='interview-grid'>
          {interviews?.map((item) => (
            <div
              key={item._id}
              className='interview-card'
              onClick={() => navigate(`/interview/${item._id}`)}
            >
              <div className='card-header'>
                <h3>{item.role || "Untitled Role"}</h3>
                <span className='score'>{item.matchScore}%</span>
              </div>

              <p className='card-date'>
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <div className='card-footer'>
                <span>View Report →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}