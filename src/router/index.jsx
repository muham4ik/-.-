import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  import React from "react";
  import App from "../App";
  import {SignUp ,SignIn , Category , Products ,Workers} from "@pages";
  import MainLayout from "../components/ui/main-layout"
  const index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" elemetn={<App />}>
          <Route index element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="main/*" element={<MainLayout/>}>
            <Route index element={<Category/>} />
            <Route path="category" element={<Category/>} />
            <Route path="products" element={<Products/>} />
            <Route path="workers" element={<Workers/>} />
          </Route>
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
  };
  export default index;