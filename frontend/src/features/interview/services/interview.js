import axios from "axios"


const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
 
export const interviewReport = async({resume ,selfDescription ,jobDescription})=>{
 try{
 const response=  await api.post(`/api/interview`,{resume ,selfDescription ,jobDescription})
  return response.data
 }catch(e){
console.log(e)
 }
}
export const getInterviewReport= async(interviewId)=>{
   try{
 const response = await api.get(`/api/${interviewId}`)
    return response.data
   }catch(e){
    console.log(e)
   }
}
export const getInterviewReportUser =async(userId)=>{
    try{
const response  = await api.get(`/api/interview/${userId}`)
  return response.data
    }catch(e){
        console.log(e)
    }
}
export default api