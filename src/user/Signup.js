import React, {useState}from 'react'
import Layout from '../core/Layout'
import {signup} from '../auth/index'

const Signup = () =>{

const [values, setValues]= useState({
    name:'',
    email:'',
    password:'',
    error:"", 
    success: false
})

const {name, email, password, error, success}= values;




const handleChange = name=>event=>{
    setValues({...values, error:false, [name]:event.target.value})
}

const clickSubmit= (e)=>{
    e.preventDefault()
    setValues({...values, error:false})
    signup({name, email, password})
    .then(data=>{
        if(data.error){
            setValues({...values, error: data.error, success:false})
        }else{
            setValues({
                ...values,
                name:'',
                email:'',
                password:'',
                error:"", 
                success: true
            })
        }
    })

}

const showSuccess=()=>(
<div className="alert alert-info" style={{display: success ? '' : 'none'}}>
        New Account is Created, plese sign in!
    </div>
)

const showError = ()=>(
    <div className="alert alert-danger" 
    style={{display: error ? '' : 'none'}}>
        {error}
    </div>
)

//Signup form
const signUpForm = ()=>(
    <form >
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input
            type="text" 
            className="form-control" 
            onChange={handleChange("name")}
            value={name}  />
        </div>

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
                Signup
        </button>
    </form>
)


    return (
        <Layout title ='Signup Page' description='Please signup'>


        <div className="container col-md-6 offset-md-3">
        {showError()}
        {showSuccess()}       
          {signUpForm()}
          
        </div>
        </Layout>

    )
}

export default Signup
