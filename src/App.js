import logo from "./logo.svg";
import "./App.css";
import React from "react";
import HomeDefault from "./pages/default/home/index";
import LoginDefault from "./pages/default/login/index";
import LoginAdmin from "./pages/admin/login/index";
import HomeAdmin from "./pages/admin/home/index";
import ProductAdmin from "./pages/admin/product/index";
import AddProduct from "./pages/admin/product/add/index"
import ProductDetail from "./pages/admin/product/detail/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteWithSubRoutes,
} from "react-router-dom";
import { Fragment } from "react";
import CategoryPage from "./pages/admin/category";
import UserPage from "./pages/admin/user/index"
import IndexAdmin from "./pages/admin";
function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact={true} component={HomeDefault} />
          <Route path="/login" exact={true} component={LoginDefault} />
          <Route path="/admin" exact={true}>
            <IndexAdmin page="HOME"/>
          </Route>
          <Route path="/admin/category" exact={true}>
            <IndexAdmin page="CATEGORY"/>
          </Route>
          <Route path="/admin/user" exact={true}>
            <IndexAdmin page="USER"/>
          </Route>
          <Route path="/admin/product" exact={true}>
            <IndexAdmin page="PRODUCT"/>
          </Route>
          <Route path="/admin/product/add" exact={true}>
            <IndexAdmin page="ADD_PRODUCT"/>
          </Route>
          <Route path="/admin/product/detail" exact={true}>
            <IndexAdmin page="PRODUCT_DETAIL"/>
          </Route>
          <Route path="/admin/login" exact={true} component={LoginAdmin} />
        </Switch>
    </Router>
  );
}

export default App;
