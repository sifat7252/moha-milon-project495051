import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './component/Root';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import LoginDaisy from './component/LoginDaisy';
import RegisterDaisy from './component/RegisterDaisy';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element : <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/logindaisy',
        element: <LoginDaisy></LoginDaisy>
      },
      {
        path: '/registerdaisy',
        element: <RegisterDaisy></RegisterDaisy>
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
