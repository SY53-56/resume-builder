 import {createBrowserRouter} from "react-router"

import Login from "./features/auth/page/Login"
import Register from "./features/auth/page/Register"
import Protected from "./features/auth/component/Protected"
 export const router= createBrowserRouter([
    {path:"/login" , 
        element:<Login/>
    },
     {path:"/register" , 
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><h1>hi sahul</h1></Protected>
    }
  ])