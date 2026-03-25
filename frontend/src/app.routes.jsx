 import {createBrowserRouter} from "react-router"

import Login from "./features/auth/page/Login"
import Register from "./features/auth/page/Register"
import Protected from "./features/auth/component/Protected"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"
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
        path:"/interview",
        element:<Protected><Interview/></Protected>
    }
  ])