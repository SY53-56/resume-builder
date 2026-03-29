import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, logout, register } from "../services/auth.api"
import { useEffect } from "react"



export const useAuth = ()=>{

const {user ,setUser , loading , setLoading} =useContext(AuthContext)
const handleLogin = async ({ email, password }) => {
  setLoading(true)
  try {
    const data = await login({ email, password })
    setUser(data.user)
  } catch (e) {
    console.log(e)
  } finally {
    setLoading(false)
  }
}
const handleRegister = async({username, email, password})=>{
   setLoading(true)
try{
const data = await register({ username,email ,password})
 setUser(data.user)
 return data.user
}catch(e){
console.log(e)
}finally{
 setLoading(false)
}
}
const handleLogout = async()=>{
setLoading(true)
try{
 await logout ()
 setUser(null)
}catch(e){
console.log(e)
}finally{
 setLoading(false)
}
}
/*
useEffect(()=>{
   const getUser = async()=>{
      try{
          const data = await getMe()
          console.log("data",data)
          setUser(data.user)
          return data.user
      }catch(e){
         
         console.log(e)
          setUser(null);
      }finally{
      setLoading(false)
   }
   }
   getUser()
},[])*/
 return {
  user,
  loading,
  handleLogin,
  handleRegister,
  handleLogout
}

}