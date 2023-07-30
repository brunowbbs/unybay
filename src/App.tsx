import Dashboard from "./pages/dashboard";
import Details from "./pages/details";
import FormProduct from "./pages/form-product";
import FormProductEdit from "./pages/form-product-edit";
import Home from "./pages/home";
import ListAllProducts from "./pages/list-all-products";

import ListRecentsProducts from "./pages/list-recents-products";

import Login from "./pages/login";
import NotFound from "./pages/not-found";
import Register from "./pages/register";
import SearchProducts from "./pages/search-result";
import UserProducts from "./pages/user-products";
import "./styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/all-recents-products",
      element: <ListRecentsProducts />,
    },
    {
      path: "/all-products",
      element: <ListAllProducts />,
    },
    {
      path: "/products/details/:id",
      element: <Details />,
    },
    {
      path: "/products/search/:product",
      element: <SearchProducts />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/my-products",
      element: <UserProducts />,
    },
    {
      path: "/form-product",
      element: <FormProduct />,
    },
    {
      path: "/form-product-edit/:id",
      element: <FormProductEdit />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      {/* <UserTemplate>
        <h1>Hello </h1>
      </UserTemplate> */}
    </div>
  );
}
