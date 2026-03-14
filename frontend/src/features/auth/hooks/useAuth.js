import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, logut, register } from "../services/auth.api"



export const useAUth = ()=>{
const context  =useContext(AuthContext)
const {user ,setUSer , loading , setLoading} = context
const handleLogin = async(email ,password)=>{
setLoading(true)
const data = await login({email ,password})
 setUSer(data.user)
 setLoading(false)
}
const handleRegister = async({username, email, password})=>{
    setLoading(true)
    const data = await register({username,email,password})
    setUSer(data.user)
    setLoading(false)
}
const handleLogut = async()=>{
  setLoading(true)
await logut()
  setUSer(null)
   setLoading(false)
}
 return (user, loading,handleLogin,handleRegister,handleLogut)

}