import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./Modules/Shared/Components/NotFound/NotFound";
import Login from "./Modules/Authentication/Components/Login/Login";
import Register from "./Modules/Authentication/Components/Register/Register";
import ForgetPassword from "./Modules/Authentication/Components/ForgetPassword/ForgetPassword";
import Cart from "./Modules/Cart/Cart";
import WishList from "./Modules/WishList/WishList";
import Products from "./Modules/Products/Products";
import Categories from "./Modules/Categories/Categories";
import Home from "./Modules/Home/Home";
import Brands from "./Modules/Brands/Brands";
import VerifyCode from "./Modules/Authentication/Components/ForgetPassword/VerifyCode";
import ResetPassword from "./Modules/Authentication/Components/ForgetPassword/ResetPassword";
import { UserContextProvider } from "./Context/UserContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import AuthLayout from "./Modules/Shared/Components/Layout/AuthLayout/AuthLayout";
import MasterLayout from "./Modules/Shared/Components/Layout/MasterLayout/MasterLayout";
import ProtectedRoute from "./Modules/Shared/Components/Layout/ProtectedRoute";
import Product from "./Modules/Products/Product";
import { CartContextProvider } from "./Context/CartContext";
import Allorders from "./Modules/Allorders/Allorders";
import Allorderss from "./Modules/Allorders/Allorderss";
import Checkout from "./Modules/Checkout/Checkout";

function App() {
  const [userData, setUserData] = useState(null);

  let saveUserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verify-code", element: <VerifyCode /> },
        { path: "reset-password", element: <ResetPassword /> },
        {path: 'allorders', element: <Allorderss />},
      ],
    },
    {
      path: "home",
      element: (
        <ProtectedRoute userData={userData}>
          <MasterLayout userData={userData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "wish-list", element: <WishList /> },
        { path: "products", element: <Products /> },
        { path: "product/:id", element: <Product /> },
        { path: "products/product/:id", element: <Product /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "allorders", element: <Allorders /> },
        { path: "checkout/:id", element: <Checkout /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <CartContextProvider>
        <RouterProvider router={routes} />
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
