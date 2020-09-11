import React from 'react'
import {API} from '../config'

const ShowImage=({item, url})=> {


    return (
        <div className="product-img col-md-8 offset-md-2"  style={{height:"30vh", width:"20vh"}}>
            {/* See back end for the correct route */}
            <img 
            src={`${API}/${url}/photo/${item._id}`} 
            alt={item.name} 
            className="mb-3" 
            style={{maxHeight:"100%", maxWidth:"100%"}}/>
        </div>
    )
}

export default ShowImage
