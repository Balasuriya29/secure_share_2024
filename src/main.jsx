import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GetFile from "./pages/GetFile.jsx";
import NavBar from "./components/Navbar/NavBar.jsx";
import SharedFilesPage from "./pages/SharedFilesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/file/share/:shareId",
    element: <GetFile />,
  },
  {
    path: "/shared",
    element: <SharedFilesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
