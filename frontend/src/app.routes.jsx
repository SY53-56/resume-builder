 import {createBrowserRouter} from "react-router-dom"

import Login from "./features/auth/page/Login"
import Register from "./features/auth/page/Register"
import Protected from "./features/auth/component/Protected"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"
import Dashboard from "./features/interview/pages/Dashboard"
 export const router= createBrowserRouter([
    {path:"/login" , 
        element:<Login/>
    },
     {path:"/register" , 
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    },
    {
        path:"/dashboard/:id",
        element:<Protected><Dashboard/></Protected>
    }
  ])