
import axios from "axios"


 const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function register({username, email,password}) {
    try{
       const response = await  api.post("/api/auth/register", {
        username, email ,password
     } )
     return response.data
    }catch(e){
        console.log(e)
    }
}

export async function login({username, email}) {
    try{
       const response = await  api.post("/api/auth/login", {
        username, email 
     } )
     return response.data
    }catch(e){
        console.log(e)
    }
}

export async function logut() {
    try{
       const response = await  api.get("/api/auth/logout", {
        
     } ,{withCredentials:true})
     return response.data
    }catch(e){
        console.log(e)
    }
}

export async function getMe() {
    try{
       const response = await  api.get("/api/auth/get-me",{withCredentials:true})
     return response.data
    }catch(e){
        console.log(e)
    }
}