import { useCallback, useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, logout, register} from "../services/auth.api"




export const useAuth = ()=>{

const {user ,setUser , loading , setLoading} =useContext(AuthContext)

const handleLogin = useCallback(async({email , password})=>{
    setLoading(true)
  try {
    const data = await login({ email, password })
    setUser(data.user)
  } catch (e) {
    console.log(e)
  } finally {
    setLoading(false)
  }
},[setLoading ,setUser])
const handleRegister = useCallback(async({username ,email,password})=>{
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
},[setLoading, setUser])

const handleLogout = useCallback(async()=>{
 
setLoading(true)
try{
 await logout ()
 setUser(null)
}catch(e){
console.log(e)
}finally{
 setLoading(false)
}
},[setLoading,setUser])



 return {
  user,
  loading,
  handleLogin,
  handleRegister,
  handleLogout
}

}