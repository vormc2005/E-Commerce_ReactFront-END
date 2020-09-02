import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories, getFilteredProducts} from './apiCore'
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop =()=> {
    const [categories, setCategories]=useState([])
    const [error, setError]=useState(false)
    const [skip, setSkip]=useState(0)
    const [limit, setLimit]=useState(6)
    const [filteredResults, setFilteredResults]=useState([])
    const [size, setSize] = useState(0)
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

const loadFilteredResults = (newFilters)=>{
    console.log(newFilters) 
    getFilteredProducts(skip, limit, newFilters).then(data=>{
        if(data.error){
            setError(data.error)
        }else{
            // console.log(data.data)
            setFilteredResults(data.data)
            setSize(data.size)
            setSkip(0)
        }
    })
 }

 const loadMore = ()=>{
     let toSkip = skip+limit
    // console.log(newFilters) 
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data=>{
        if(data.error){
            setError(data.error)
        }else{
            // console.log(data.data)
            setFilteredResults([...filteredResults, ...data.data])
            setSize(data.size)
            setSkip(toSkip)
        }
    })
 }

 const loadMoreButton =()=>{
     return(
         size > 0 && size >=limit && (
             <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
         )
     )
 }

useEffect(()=>{
    init()
    loadFilteredResults(skip, limit, myFilters.ilters)
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
    loadFilteredResults(myFilters.filters)
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
              
               <h2 className="mb-4">Products</h2>
               <div className="row">
                        {filteredResults.map((product, i) => (
                           
                                <Card  key={i} product={product} />
                            
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
           </div>
       </div>
        
    </Layout>
    )
}

export default Shop
