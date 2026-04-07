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

  // ✅ Generate
  const generateReport = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await generateInterviewReport(data);
      setReport(res.interviewReport);
      return res.interviewReport;
    } catch (error) {
      console.error("Generate Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReport]);

  // ✅ Get Single (with section support)
  const getReportById = useCallback(async (id) => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await getInterviewReportById(id);
      setReport(res.interviewReport);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReport]);

  // ✅ Get All
  const getReportsbyUserId = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllInterviewReports();
      setReports(res.interviewReport || []);
    } catch (error) {
      console.error("Fetch All Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  // ✅ Download PDF
  const getResumePdf = useCallback(async (id) => {
    setLoading(true);
    try {
      
      const res = await generateResumePdf({ interviewReportId: id });

      const url = window.URL.createObjectURL(
        new Blob([res], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${id}.pdf`;
      link.click();
    } catch (error) {
      console.error("PDF Error:", error.response?.data || error.message);
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