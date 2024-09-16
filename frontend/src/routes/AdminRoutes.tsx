import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// Use Loadable to reduce bundle size
const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const ProfileUser = Loadable(lazy(() => import("../pages/User")));
const EditUser = Loadable(lazy(() => import("../pages/User/edit")));
const ChangePassword = Loadable(lazy(() => import("../pages/User/changepassword")));
const TutorProfile = Loadable(lazy(() => import("../pages/TutorProfile")));
const EditTutor = Loadable(lazy(() => import("../pages/TutorProfile/edit")));

const AdminRoutes = (isLoggedIn: boolean): RouteObject => {
  const userRoleId = parseInt(localStorage.getItem("user_role_id") || "0", 10);
  const id = localStorage.getItem('id') || 'Unknown User';

  return {
    path: "/",
    element: <MinimalLayout />, // ใช้ MinimalLayout เป็น Wrapper
    children: [
      {
        path: "/",
        element: isLoggedIn ? (userRoleId === 2 ? <TutorProfile /> : <ProfileUser />) : <MainPages />,
      },
      {
        path: "/users",
        element: isLoggedIn ? (userRoleId === 2 ? <TutorProfile /> : <ProfileUser />) : <MainPages />,
        children: [
          {
            path: "edit/:id",
            element: isLoggedIn ? (userRoleId === 2 ? <EditTutor /> : <EditUser />) : <MainPages />,
          },
          {
            path: "changepassword/:id",
            element: isLoggedIn ? <ChangePassword /> : <MainPages />,
          },
        ],
      },
    ],
  };
};

export default AdminRoutes;
