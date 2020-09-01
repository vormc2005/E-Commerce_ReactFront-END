import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth/index'





const isActive =(history, path)=>{
    if(history.location.pathname===path){
        return{color: '#ff9900'}
    }else{
        return {color:'#ffffff'}
    }
}

function Menu({history}) {    


    return (
        <div>
           <ul className="nav nav-tabs bg-secondary">
               <li className='nav-item'>
                   <Link className="nav-link" to ="/" style={isActive(history, '/')}>Home</Link>
                </li>

               {isAuthenticated() && isAuthenticated().user.role ===0 && (
                    <li className='nav-item'>
                    <Link className="nav-link" to ="/user/dashboard" style={isActive(history, '/user/dashboard')}>User Dashboard</Link>
                 </li>
               )}

                {isAuthenticated() && isAuthenticated().user.role ===1 && (
                    <li className='nav-item'>
                    <Link className="nav-link" to ="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Admin Dashboard</Link>
                 </li>
               )}

                {!isAuthenticated() &&  (
                    <Fragment>
                         <li className='nav-item'>
                   <Link className="nav-link" to ="/signin" style={isActive(history, '/signin')}>Signin</Link>
               </li>

               <li className='nav-item'>
                   <Link className="nav-link" to ="/signup" style={isActive(history, '/signup')}>Signup</Link>
               </li>

                    </Fragment>
                )}

               {isAuthenticated() && (
                   <li className='nav-item'>
                   <span className="nav-link" onClick ={()=>signout(()=>{
                      history.push('/') 
                   })} style={{cursor: 'pointer', color:'ffffff'}}>Signout</span>
               </li>
               )}
               
               </ul> 
        </div>
    )
}

export default withRouter(Menu)