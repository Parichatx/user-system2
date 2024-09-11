import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// ลองใช้ Loadable เพื่อลดขนาดของ Bundle
const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const ProfileUser = Loadable(lazy(() => import("../pages/User")));
const EditUser = Loadable(lazy(() => import("../pages/User/edit")));
const ChangePassword = Loadable(lazy(() => import("../pages/User/changepassword")));
const TutorProfile = Loadable(lazy(() => import("../pages/TutorProfile")));
const EditTutor = Loadable(lazy(() => import("../pages/TutorProfile/edit")));

// สร้าง AdminRoutes ขึ้นอยู่กับสถานะการล็อกอิน
const AdminRoutes = (isLoggedIn: boolean): RouteObject => {
  return {
    path: "/",
    element: <MinimalLayout />, // ใช้ MinimalLayout เป็น Wrapper
    children: [
      {
        path: "/",
        element: isLoggedIn ? <ProfileUser /> : <MainPages />,
      },
      {
        path: "/user",
        element: isLoggedIn ? <ProfileUser /> : <MainPages />, // ใช้ ProfileUser เมื่อมีการล็อกอิน
        children: [
          {
            path: "edit/:id", // เส้นทางสำหรับแก้ไขผู้ใช้
            element: isLoggedIn ? <EditUser /> : <MainPages />,
          },
          {
            path: "changepassword",
            element: isLoggedIn ? <ChangePassword /> : <MainPages />,
          },
          {
            path: "tutorprofile",
            element: isLoggedIn ? <TutorProfile /> : <MainPages />,
          },
          {
            path: "edittutor",
            element: isLoggedIn ? <EditTutor /> : <MainPages />,
          },
        ],
      },
    ],
  };
};

export default AdminRoutes;
