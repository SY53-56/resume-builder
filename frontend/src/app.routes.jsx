import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./layout";
import Protected from "./features/auth/component/Protected";

// ✅ Lazy imports
const Login = lazy(() => import("./features/auth/page/Login.jsx"));
const Register = lazy(() => import("./features/auth/page/Register.jsx"));
const Home = lazy(() => import("./features/interview/pages/Home.jsx"));
const Interview = lazy(() => import("./features/interview/pages/Interview.jsx"));
const Dashboard = lazy(() => import("./features/interview/pages/Dashboard.jsx"));

// ✅ Suspense wrapper
const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
 <Component/>
  </Suspense>
);

// ✅ Router config
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: withSuspense(Login),
      },
      {
        path: "/register",
        element: withSuspense(Register),
      },
      {
        index: true,
        element: (
          <Protected>
            {withSuspense(Home)}
          </Protected>
        ),
      },
      {
        path: "/interview/:interviewId",
        element: (
          <Protected>
            {withSuspense(Interview)}
          </Protected>
        ),
      },
      {
        path: "/dashboard/:id",
        element: (
          <Protected>
            {withSuspense(Dashboard)}
          </Protected>
        ),
      },
    ],
  },
]);