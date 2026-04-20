import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home, { Panel } from "./HomePage/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/useAuth.tsx";
import LoginPage from "./LoginPage/LoginPage.tsx";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home panel={Panel.HOME} />,
      },
      {
        path: "/dashboard",
        element: <Home panel={Panel.DASHBOARD} />,
      },
      {
        path: "/workouts",
        element: <Home panel={Panel.WORKOUTS} />,
      },
      {
        path: "/progress",
        element: <Home panel={Panel.PROGRESS} />,
      },
      {
        path: "/profile",
        element: <Home panel={Panel.PROFILE} />,
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
