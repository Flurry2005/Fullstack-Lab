import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./HomePage/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/useAuth.tsx";
import LoginPage from "./LoginPage/LoginPage.tsx";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
