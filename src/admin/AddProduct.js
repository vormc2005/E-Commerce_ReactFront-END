import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'
import {createProduct, getCategories} from './apiAdmin'



const AddProduct=()=> {


const {user, token}=isAuthenticated()
const [values, setValues]=useState({
    name:'',
    description:'',
    price:'',
    categories:[],
    category:'',
    shipping:'',
    quantity:'',
    photo:'',
    loading: false,
    error:'',
    createdProduct:'',
    redirectToProfile: false,
    formData:''

})
//destructure state
const { 
name,
description,
price,
categories,
category,
shipping,
quantity,
loading,
error,
createdProduct,
redirectToProfile,
formData
} = values


//Load categories and set form data
const init=()=>{
    getCategories().then(data=>{
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            setValues({...values, 
                categories: data, 
                formData: new FormData()})
        }
    })
}

//use effect, so if values are added form data object i created in the state, then it will be sent to our API
useEffect(()=>{
   init()
}, [])

//handle form change, need to differentiate photo file from regular form filed JSON
const handleChange =name=>event=>{
    //checcking if file or form data
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({...values, [name]: value})
}

//submit API call
const clickSubmit = (e)=>{
    e.preventDefault()
    setValues({...values, error:'', loading: true})

    createProduct(user._id, token, formData)
    .then(data=>{
        if(data.error){
            setValues({...values, error:data.error})
        }else{
            setValues({...values, 
                name:'', 
                description:'', 
                photo:'', 
                price:"", 
                quantity:'',                
                loading: false,
                createdProduct: data.name
            })
        }
    })
}

//Form
const newPostForm = ()=>{
    return(
    <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Upload Photo Here</h4>
        <div className="form-group">
            <label className="btn btn-outline-secondary">
            <input onChange={handleChange('photo')} type="file" name='photo' accept="image/*" />
            </label>
        </div>
{/* Name */}
         <div className="form-group">   
            <label className="text-muted">Name</label>
            <input 
                onChange={handleChange('name')} 
                type="text" 
                className="form-control"
                value={name}
            />
         </div>
{/* Descritpion */}
         <div className="form-group">   
            <label className="text-muted">Description</label>
            <textarea 
                onChange={handleChange('description')} 
                type="text" 
                className="form-control"
                value={description}    
            />
         </div>
{/* Price */}
         <div className="form-group">   
            <label className="text-muted">Price</label>
            <input 
                onChange={handleChange('price')} 
                type="number" 
                className="form-control"
                value={price}    
            />
         </div>
{/* Category Select */}
         <div className="form-group">   
            <label className="text-muted">Category</label>
            <select 
                onChange={handleChange('category')}               
                className="form-control"               
            >
               <option >Please Select</option> 
               {categories && categories.map((c, i)=>(
               <option 
               key={i} 
               value={c._id}
               >
                   {c.name}
                </option>
               ))}
            </select>
         </div>
{/* Shipping select */}
         <div className="form-group">   
            <label className="text-muted">Shipping</label>
            <select 
                onChange={handleChange('shipping')}               
                className="form-control"               
            >
                <option >Please Select</option> 
               <option value="1">Yes</option> 
               <option value="0">No</option>
            </select>
         </div>
{/* Quantity */}
         <div className="form-group">   
            <label className="text-muted">Quantity</label>
            <input 
                onChange={handleChange('quantity')} 
                type="number" 
                className="form-control"
                value={quantity}
            />
         </div>
        <button className="btn btn-outline-primary">Create Product</button>
    </form>
    )
}


const showError = ()=>{
    return(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
}
//Success
const showSuccess = ()=>{
   
    return(
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct} is created`}</h2>
        </div>
    )
}

const showLoading = ()=>{
    return(
       loading && (<div className="alert alert-success"><h2>Loading...</h2></div>)
    )
}

    return (
        <Layout 
                title="Add a New Product" 
                description={`Hello, 
                ${user.name}. You can add new product here!`} 
                className="container">
                    <div className="col-md-8 offset-md-2">
                        {showSuccess()}
                        {showError()}
                        {showLoading()}
                        {newPostForm()}
                    </div>
        </Layout>
    )
}

export default AddProduct



