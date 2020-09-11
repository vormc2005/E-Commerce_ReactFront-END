import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {getProducts, deleteProduct} from './apiAdmin'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'


function ManageProducts() {

    const [products, setProducts]=useState([])

    const {user, token}=isAuthenticated()

    const loadProdaucts=()=>{
        getProducts()
        .then(data=>{
            if (data.error){
                console.log(data.error)
            }else{
                setProducts(data)
            }
        })
    }

    const destroy = productId =>{
        deleteProduct(productId, user._id, token)
        .then(data=>{
            if (data.error){
                console.log(data.error)
            }else{
                loadProdaucts()
            }
            
        })
    }




    useEffect(()=>{
        loadProdaucts()
    }, [])


    return (
        <Layout title="Add a new product" description='Manage your products here' className='container-fluid'>
        
        <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong className="col-10">{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
            
       
        </Layout>
    )
}

export default ManageProducts
