import React, {useState}from 'react'
import Layout from '../core/Layout'
import {signin, authenticate, isAuthenticated} from '../auth/index'
import { Redirect} from 'react-router-dom'

const Signin = () =>{

const [values, setValues]= useState({
   
    email:'cash@gmail.com',
    password:'Test123',
    error:"", 
    loading: false,
    redirectToRefferer: false
})

const { email, password, error, loading, redirectToRefferer}= values;
const {user} = isAuthenticated()



const handleChange = name=>event=>{
    setValues({...values, error:false, [name]:event.target.value})
}

const clickSubmit= (e)=>{
    e.preventDefault()
    setValues({...values, error:false, loading: true})
    signin({ email, password})
    .then(data=>{
        if(data.error){
            setValues({...values, error: data.error, loading:false})
        }else{
          authenticate(data, ()=>{
            setValues({
                ...values,
               redirectToRefferer: true
            })
          })
        }
    })

}

const showLoading=()=>(
loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)    
)


const showError = ()=>(
    <div className="alert alert-danger" 
    style={{display: error ? '' : 'none'}}>
        {error}
    </div>
)

const redirectUser=()=>{
    if(redirectToRefferer){
       if(user && user.role === 0){
           return <Redirect to="/user/dashboard"/>
       }else{
        return <Redirect to="/admin/dashboard"/>
       }
    }
    if(isAuthenticated()){
       return <Redirect to="/"/>    
    }
    
}

//Signup form
const signUpForm = ()=>(
    <form >
       
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input 
            type="email" 
            className="form-control" 
            onChange={handleChange("email")} 
            value={email}/>
        </div>

        <div className="form-group">
            <label className="text-muted">Password</label>
            <input 
            type="password" 
            className="form-control" 
            onChange={handleChange("password")}
            value={password}/>
        </div>

        <button 
            className='btn btn-primary' 
            onClick={clickSubmit}>
                Signin
        </button>
    </form>
)


    return (
        <Layout title ='Signup Page' description='Please signup'>
            <div style={{textAlign:"center"}}>

            <h3>To view admin part of the site, please use following redentials</h3>
            <p>email : admin@gmail.com</p>
            <p>password : Test123</p>
            </div>
        <div className="container col-md-6 offset-md-3">
        {showError()}
        {showLoading()}       
        {signUpForm()}
        {redirectUser()}
          
        </div>
        </Layout>

    )
}

export default Signin
