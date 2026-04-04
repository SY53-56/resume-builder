import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"
import { useAuth } from "../../auth/hooks/useAuth"


export const useInterview = () => {

   
    const { interviewId } = useParams()
   const {user}= useAuth()

    const { loading, setLoading, report, setReport, reports, setReports } = useContext(InterviewContext)

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
       
        try {
         const   response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
               return response.interviewReport
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
      
        try {
          const  response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
               return response.interviewReport
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }

    const  getReportsbyUserId = async (userId) => {
        setLoading(true)
       
        try {
          const  response = await getAllInterviewReports(userId)
          console.log("responsedata",response)
            setReports(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

     
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

 
    return { loading, report, reports, generateReport, getReportById, getReportsbyUserId, getResumePdf }

}