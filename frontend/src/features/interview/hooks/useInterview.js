import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview";

import { useCallback, useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
  } = useContext(InterviewContext);

  // 🔥 Generate Report
  const generateReport = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport(data);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.error("Generate Report Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReport]);

  // 🔥 Get Single Report
  const getReportById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(id);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.error("Get Report Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReport]);

  // 🔥 Get All Reports
  const getReportsbyUserId = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports(userId);
      setReports(response.interviewReport || []);
      return response.interviewReport;
    } catch (error) {
      console.error("Get Reports Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  // 🔥 Download PDF
  const getResumePdf = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await generateResumePdf({ interviewReportId: id });

      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("PDF Download Error:", error.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReportsbyUserId,
    getResumePdf,
  };
};