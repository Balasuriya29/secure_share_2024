import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LocationTest from './pages/LocationTest.jsx'
import SSE from './pages/SSE.jsx'
import GetFile from './pages/GetFile.jsx'
import Test from './pages/test.jsx'
import NavBar from './components/Navbar/NavBar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/token",
    element: <NavBar/>
  },
  {
    path : "/location",
    element : <LocationTest/>
  },
  {
    path : "/sse",
    element : <SSE/>
  },
  {
    path : "/file",
    element : <GetFile/>
  },
  {
    path :"/test",
    element : <Test/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
