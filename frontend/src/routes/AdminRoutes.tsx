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
const MyProfile = Loadable(lazy(() => import("../pages/TutorProfile/myprofile")));

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
        path: "users", // ไม่ใช้ "/users" เพราะ path จะถูก match โดยเริ่มจาก root
        element: isLoggedIn ? (userRoleId === 2 ? <TutorProfile /> : <ProfileUser />) : <MainPages />,
        children: [
          {
            path: "edit/:id", // เส้นทางสำหรับแก้ไข user
            element: isLoggedIn ? <EditUser /> : <MainPages />,
          },
          {
            path: "changepassword/:id", // เส้นทางสำหรับเปลี่ยนรหัสผ่าน
            element: isLoggedIn ? <ChangePassword /> : <MainPages />,
          },
        ],
      },
      {
        path: "tutor_profiles/users/:userID",
        element: isLoggedIn ? <MyProfile /> : <MainPages />,
      },
      {
        path: "tutor_profiles/edit/:userID",
        element: isLoggedIn ? <EditTutor /> : <MainPages />,
      }
    ],
  };
};

export default AdminRoutes;
