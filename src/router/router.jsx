import { createBrowserRouter } from "react-router-dom";
import Guest from "../layout/guest.jsx";
import Home from "../pages/guest/home.jsx";
import Companies from "../pages/guest/companies.jsx";
import Stories from "../pages/guest/stories.jsx";
import FAQS from "../pages/faqs.jsx";
import User from "../layout/user.jsx";
import UserHome from "../pages/user/userHome.jsx";
import UserCompanies from "../pages/user/userCompanies.jsx";
import UserStories from "../pages/user/userStories.jsx";
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
    ],
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "/user/home",
        element: <UserHome />,
      },
      {
        path: "/user/companies",
        element: <UserCompanies />,
      },
      {
        path: "/user/stories",
        element: <UserStories />,
      },
    ],
  },
]);

export default router;
