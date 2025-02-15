import { createBrowserRouter } from "react-router-dom";
import Guest from "../layout/guest.jsx";
import Home from "../pages/guest/home.jsx";
import Companies from "../pages/guest/companies.jsx";
import Stories from "../pages/guest/stories.jsx";
import FAQS from "../pages/guest/faqs.jsx";
import User from "../layout/user.jsx";
import UserDashboard from "../pages/user/userDashboard.jsx";
import UserStories from "../pages/user/userStories.jsx";
import UserCompanies from "../pages/user/userCompanies.jsx";
import Register from "../pages/authentication/register.jsx";
import ForgotPassword from "../pages/authentication/forgotPassword.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Guest />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/companies/:id",
        element: <Companies />,
      },

      {
        path: "/stories",
        element: <Stories />,
      },
      {
        path: "/stories/:id",
        element: <Stories />,
      },
      {
        path: "/faqs",
        element: <FAQS />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "/user/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/user/companies",
        element: <UserCompanies />,
      },
      {
        path: "/user/stories",
        element: <UserStories />,
      },
      {
        path: "/user/faqs",
        element: <FAQS />,
      },
    ],
  },
]);

export default router;
