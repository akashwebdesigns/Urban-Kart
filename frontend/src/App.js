import { React, useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import Webfont from "webfontloader";
import ProductDetail from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import UpdateProfile from "./components/User/UpdateProfile";
import { loadUser } from "./actions/userAction";
import store from "./store";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/Cart/Success";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import ErrorPage from "./components/layout/Not Found/errorPage";
import ContactUs from "./components/layout/Contact Us/ContactUs";
import AboutUs from "./components/layout/About Us/About";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`/api/v1/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <Header />
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute
                  exact
                  path="/process/payment"
                  component={Payment}
                />
              </Elements>
            )}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:id" component={ProductDetail} />
              <Route exact path="/products" component={Products} />
              <Route path="/products/:keyword" component={Products} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/login" component={LoginSignUp} />
              <ProtectedRoute exact path="/account" component={Profile} />
              <ProtectedRoute
                exact
                path="/me/update"
                component={UpdateProfile}
              />
              <ProtectedRoute
                exact
                path="/password/update"
                component={UpdatePassword}
              />
              <Route exact path="/password/forgot" component={ForgotPassword} />
              <Route
                exact
                path="/password/reset/:token"
                component={ResetPassword}
              />
              <Route exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/shipping" component={Shipping} />
              <ProtectedRoute
                exact
                path="/order/confirm"
                component={ConfirmOrder}
              />
              <ProtectedRoute exact path="/success" component={Success} />
              <ProtectedRoute exact path="/orders" component={MyOrders} />
              <ProtectedRoute
                exact
                path="/order/:id"
                component={OrderDetails}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/dashboard"
                component={Dashboard}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/products"
                component={ProductList}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/product"
                component={NewProduct}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/product/:id"
                component={UpdateProduct}
              />
              <ProtectedRoute
                exact
                path="/admin/orders"
                isAdmin={true}
                component={OrderList}
              />

              <ProtectedRoute
                exact
                path="/admin/order/:id"
                isAdmin={true}
                component={ProcessOrder}
              />
              <ProtectedRoute
                exact
                path="/admin/users"
                isAdmin={true}
                component={UsersList}
              />
              <ProtectedRoute
                exact
                path="/admin/user/:id"
                isAdmin={true}
                component={UpdateUser}
              />
              <ProtectedRoute
                exact
                path="/admin/reviews"
                isAdmin={true}
                component={ProductReviews}
              />

              <Route exact path="/contact" component={ContactUs} />
              <Route exact path="/about" component={AboutUs} />

              {/* <Route exact path="*" component={ErrorPage} /> */}
              <Route
                component={
                  window.location.pathname === "/process/payment"
                    ? null
                    : ErrorPage
                }
              />
            </Switch>
            <Footer />
          </ThemeProvider>
        </ScrollToTop>
      </div>
    </Router>
  );
}

export default App;
