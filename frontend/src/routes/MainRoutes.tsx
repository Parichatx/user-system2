import { lazy } from "react";
import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import MinimalLayout from "../layout/MinimalLayout";
import Loadable from "../components/third-patry/Loadable";

const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const RegisterSelect = Loadable(lazy(() => import("../pages/authentication/RegisterSelect")));
const StudentSignup = Loadable(lazy(() => import("../pages/authentication/RegisterStudent")));
const TutorSignup1 = Loadable(lazy(() => import("../pages/authentication/RegisterTutor1")));
const TutorSignup2 = Loadable(lazy(() => import("../pages/authentication/RegisterTutor2")));

const MainRoutes = (): RouteObject => {
  const isLoggedIn = !!localStorage.getItem("user"); // ตรวจสอบการล็อกอินจาก localStorage

  return {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: "/",
        element: isLoggedIn ? <Navigate to="/profileuser" /> : <MainPages />,
      },
      {
        path: "/signupselect",
        element: isLoggedIn ? <Navigate to="/profileuser" /> : <RegisterSelect />,
      },
      {
        path: "/studentsignup",
        element: isLoggedIn ? <Navigate to="/profileuser" /> : <StudentSignup />,
      },
      {
        path: "/tutorsignup1",
        element: isLoggedIn ? <Navigate to="/profileuser" /> : <TutorSignup1 />,
      },
      {
        path: "/tutorsignup2",
        element: isLoggedIn ? <Navigate to="/profileuser" /> : <TutorSignup2 />,
      },
      {
        path: "*",
        element: <MainPages />,
      },
    ],
  };
};

export default MainRoutes;
