import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/page/Login";
import Register from "./features/auth/page/Register";
import Protected from "./features/auth/component/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Dashboard from "./features/interview/pages/Dashboard";
import Layout from "./layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ layout wrapper
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        index: true, // default "/"
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/interview/:interviewId",
        element: (
          <Protected>
            <Interview />
          </Protected>
        ),
      },
      {
        path: "/dashboard/:id",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
    ],
  },
]);