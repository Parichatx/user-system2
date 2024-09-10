import { lazy } from "react";

import { RouteObject } from "react-router-dom";

import Loadable from "../components/third-patry/Loadable";

import FullLayout from "../layout/FullLayout";


const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));

const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));

const ProfileUser = Loadable(lazy(() => import("../pages/User")));

const EditUser = Loadable(lazy(() => import("../pages/User/edit")));


const AdminRoutes = (isLoggedIn : boolean): RouteObject => {

  return {

    path: "/",

    element: isLoggedIn ? <FullLayout /> : <MainPages />,

    children: [

      {

        path: "/",

        element: <Dashboard />,

      },

      {

        path: "/user",

        children: [

          {

            path: "profileuser",

            element: <ProfileUser />,

          },

         
          {

            path: "User/edit/:id",

            element: <EditUser />,

          },

        ],

      },

    ],

  };

};


export default AdminRoutes;