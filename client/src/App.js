import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/ProductDetails";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ResetPassword from "./components/user/ResetPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import ShippingInfo from "./components/cart/ShippingInfo";
import Confirmorder from "./components/cart/Confirmorder";
import Payment from "./components/cart/Payment";
import PaymentSuccess from "./components/cart/PaymentSuccess";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/dashboard/Dashboard";
import ProductsList from "./components/admin/productlist/ProductsList";
import NewProduct from "./components/admin/newproduct/NewProduct";
import UpdateProduct from "./components/admin/updateproduct/UpdateProduct";
import OrdersList from "./components/admin/orderlist/OrderList";
import ProcessOrder from "./components/admin/processorder/ProcessOrder";
import UsersList from "./components/admin/userlist/UsersList";
import UpdateUser from "./components/admin/updateuser/UpdateUser";
import ProductReviews from "./components/admin/productreviews/ProductReviews";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./components/actions/authActions";
import "./App.css";
import { axios } from "axios";

const stripe = loadStripe(
  "pk_test_51LopskSGAjDSZQyBVlYz24jYhviKM94BLmSCmiimOAre20S8Ti9RD2CF8BPfAsofbNl1fdmQK2UxyFXSPvzS0Tmm00PM0lilLG"
);
function App() {
  const dispatch = useDispatch();
  const [onstinegetuserinfo, setonstinegetuserinfo] = useState(true);
  if (onstinegetuserinfo === true) {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
      setonstinegetuserinfo(false);
    }
  }
  return (
    <>
      <Elements stripe={stripe}>
        <BrowserRouter>
          <Header />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/password/forgot" element={<ResetPassword />} />
              <Route path="/password/reset/:token" element={<NewPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<ShippingInfo />} />
              <Route path="/confirm" element={<Confirmorder />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route path="/orders/me" element={<ListOrders />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductsList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
              <Route path="/admin/orders" element={<OrdersList />} />
              <Route path="/admin/order/:id" element={<ProcessOrder />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/user/:id" element={<UpdateUser />} />
              <Route path="/admin/reviews" element={<ProductReviews />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </Elements>
    </>
  );
}

export default App;
