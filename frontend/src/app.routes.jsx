import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./layout";
import Protected from "./features/auth/component/Protected";

// 🔥 Lazy imports
const Login = lazy(() => import("./features/auth/page/Login"));
const Register = lazy(() => import("./features/auth/page/Register"));
const Home = lazy(() => import("./features/interview/pages/Home"));
const Interview = lazy(() => import("./features/interview/pages/Interview"));
const Dashboard = lazy(() => import("./features/interview/pages/Dashboard"));

// 🔥 Wrapper for suspense
const withSuspense = (Component) => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <Component />
  </Suspense>
);

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