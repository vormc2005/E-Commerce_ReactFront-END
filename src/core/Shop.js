import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories} from './apiCore'
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop =()=> {
    const [categories, setCategories]=useState([])
    const [error, setError]=useState(false)
    const [myFilters, setMyFilters] = useState({
        filters: { category:[], price:[]}
    })


const init=()=>{
    getCategories().then(data=>{
        if(data.error){
            setError(data.error)
        }else{
            setCategories(data)
        }
    })
}

useEffect(()=>{
    init()
}, [])

const handleFilters = (filters, filterBy)=>{
    // console.log("SHOP", filters, filterBy)
    //set filters state
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters

    if(filterBy=='price'){
        let priceValues = handlePrice(filters)
        newFilters.filters[filterBy] = priceValues

    }

    setMyFilters(newFilters)


}

    const handlePrice = value =>{
        const data = prices
        let array =[]
        for(let key in data){
           if(data[key]._id === parseInt(value)){
               array =data[key].array
           } 
          
        }
        return array;
    }

    return (
        <Layout title='Shop page' description='Search for books of your choice' className="container-fluid">
       
       <div className="row">
    <div className="col-4">
        <h4>Filter by Categories</h4>
            <ul>
            <CheckBox 
                categories={categories} 
                handleFilters={filters=>
                handleFilters(filters, "category")} />
            </ul>

            <h4>Filter by Price range</h4>
            <div>
                <RadioBox 
                   prices={prices} 
                    handleFilters={filters=>
                    handleFilters(filters, "price")} />
            </div>
    </div>
           <div className="col-8">
               
               {JSON.stringify(myFilters)}
           </div>


       </div>


      
          
       
       
    </Layout>
    )
}

export default Shop
