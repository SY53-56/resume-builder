import { createContext, useState } from "react";


 export const InterviewContext  = createContext()


 export const InterviewProvider = ({Children})=>{
     const [interview ,setInterview] = useState([])
 const [interviewLoading ,setInterviewLoading]= useState(false)
    return (
        <InterviewContext.Provider value={{interview, setInterview ,interviewLoading,setInterviewLoading}}>
            {Children}
        </InterviewContext.Provider>
    )
 }