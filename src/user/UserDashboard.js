import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'

const UserDashboard=()=> {
    //Destructuring from local storage
    const {user:{_id, name, email, role}} = isAuthenticated()


    const userLinks = ()=>{
        return(
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                   <li className="list-group-item">
                       <Link to="/cart" className="nav-link">
                       My Cart
                       </Link>
                   </li>
                   <li className="list-group-item">
                       <Link to="/profile/update" className="nav-link">
                      Update My Profile
                      </Link>
                   </li>
               </ul>
            </div>
        )
    }



    const userInfo =()=>{
        return(
            <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>
         </div> 
        )
    }

    const purchaseHistory = ()=>{
        return(
            <div className="card mb-5">
               <h3 className="card-header">Purchase History</h3>
               <ul className="list-group">
                   <li className="list-group-item">History</li>
                  
               </ul>
            </div> 
        )
    }


    return (
        <Layout title="User Dashboard" description={`Hello, ${name}`} className="container-fluid">
           <div className="row">
                <div className="col-md-3">
                    {userLinks()}

                </div>
               
               
                <div className="col-md-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>          

          </div>
            
        </Layout>
    )
}

export default UserDashboard
