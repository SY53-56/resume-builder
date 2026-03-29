
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

export async function login({password, email}) {
    try{
       const response = await  api.post("/api/auth/login", {
     password, email 
     } )
     console.log("response,", response)
     return response.data
    }catch(e){
        console.log(e)
    }
}

export async function logout() {
    try{
       const response = await  api.get("/api/auth/logout", {
        
     } )
     return response.data
    }catch(e){
        console.log(e)
    }
}
/*
export async function getMe() {
    try{
       const response = await  api.get("/api/auth/get-me",)
     return response.data
    }catch(e){
        console.log(e)
    }
}*/