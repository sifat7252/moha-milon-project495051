import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./component/Root";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import LoginDaisy from "./component/LoginDaisy";
import RegisterDaisy from "./component/RegisterDaisy";
import AuthProvider from "./component/Provider/AuthProvider";
import Orders from "./component/Orders";
import PrivateRoutes from "./component/Routes/PrivateRoutes";
import Dashboard from "./component/Dashboard";
import Profile from "./component/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/logindaisy",
        element: <LoginDaisy></LoginDaisy>,
      },
      {
        path: "/registerdaisy",
        element: <RegisterDaisy></RegisterDaisy>,
      },
      {
        path: "/orders",
        element: <PrivateRoutes><Orders></Orders></PrivateRoutes>
      },
      {
        path: "/dashboard", 
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
      }, 
      {
        path: "/profile",
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
