import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Signout from './user/Signout'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'




function Routes() {
    return (
        <BrowserRouter>
            <Switch>
               
                <Route path = "/signin" exact component={Signin}/>
                <Route path = "/signup" exact component={Signup}/>
                <Route path = "/signout" exact component={Signout}/>
                <Route path = "/" exact component={Home}/>
                <PrivateRoute path ="/user/dashboard" exact component={UserDashboard}/>
                <AdminRoute path ="/admin/dashboard" exact component={AdminDashboard}/>
            </Switch>
     </BrowserRouter>
    )
}

export default Routes