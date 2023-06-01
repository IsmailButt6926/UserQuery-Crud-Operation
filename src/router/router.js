import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import View from "../pages/View";
import Edit from "../pages/Edit";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/view/:id", element: <View /> },
  { path: "/edit/:id", element: <Edit /> },
];

const router = createBrowserRouter([
  {
    children: routes,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
