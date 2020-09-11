import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Signout from './user/Signout'
import Home from './core/Home'
import Shop from './core/Shop'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Orders'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
               
                <Route path = "/signin" exact component={Signin}/>
                <Route path = '/product/:productId' exact component={Product}/>
                <Route path = "/signup" exact component={Signup}/>
                <Route path = "/signout" exact component={Signout}/>
                <Route path = "/" exact component={Home}/>
                <Route path = "/shop" exact component={Shop}/>
                <PrivateRoute path ="/user/dashboard" exact component={UserDashboard}/>
                <AdminRoute path ="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path ="/category/create" exact component={AddCategory}/>
                <AdminRoute path ="/product/create" exact component={AddProduct}/>
                <AdminRoute path ="/admin/orders" exact component={Orders}/>
                <Route path = "/cart" exact component={Cart}/>
            </Switch>
     </BrowserRouter>
    )
}

export default Routes
