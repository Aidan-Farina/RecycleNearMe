import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App.jsx";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile.jsx";
import Error from "./pages/error/index.jsx";
import AddLocation from "./pages/AddLocation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/AddLocation",
        element: <AddLocation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
  
);
