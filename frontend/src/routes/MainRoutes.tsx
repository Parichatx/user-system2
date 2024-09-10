import { lazy } from "react";
import React from "react";
import { RouteObject } from "react-router-dom";
import MinimalLayout from "../layout/MinimalLayout";
import Loadable from "../components/third-patry/Loadable";

const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const RegisterSelect = Loadable(lazy(() => import("../pages/authentication/RegisterSelect")));
const StudentSignup = Loadable(lazy(() => import("../pages/authentication/RegisterStudent")));
const TutorSignup1 = Loadable(lazy(() => import("../pages/authentication/RegisterTutor1")));
const TutorSignup2 = Loadable(lazy(() => import("../pages/authentication/RegisterTutor2")));

const ProfileUser = Loadable(lazy(() => import("../pages/User")));
const EditUser = Loadable(lazy(() => import("../pages/User/edit")));
const ChangePassword = Loadable(lazy(() => import("../pages/User/changepassword")));

const TutorProfile = Loadable(lazy(() => import("../pages/TutorProfile")));
const EditTutor = Loadable(lazy(() => import("../pages/TutorProfile/edit")));


const MainRoutes = (): RouteObject => {
  return {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: "/",
        element: <MainPages />,
      },
      {
        path: "/signupselect",
        element: <RegisterSelect />,
      },
      {
        path: "/studentsignup",
        element: <StudentSignup />,
      },
      {
        path: "/tutorsignup1",
        element: <TutorSignup1 />,
      },
      {
        path: "/tutorsignup2",
        element: <TutorSignup2 />,
      },


      {
        path: "/profileuser",
        element: <ProfileUser />,
      },

      {
        path: "/edituser",
        element: <EditUser />,
      },
      {
        path: "/changepassword",
        element: <ChangePassword />,
      },

      {
        path: "/tutorprofile",
        element: <TutorProfile />,
      },

      {
        path: "/edittutor",
        element: <EditTutor />,
      },


      {
        path: "*",
        element: <MainPages />,
      },
    ],
  };
};

export default MainRoutes;
