import React, {useState, useEffect} from 'react'

const CheckBox=({categories, handleFilters})=> {

    const [checked, setChecked]=useState([])

    //handle chang in the togle, we need category id
    const handleToggle = c =>()=>{
        //check if category is in the state array checked
        const currentCategoryId = checked.indexOf(c) ///Returns if c is in the array, otherwise returns -1
        // console.log(currentCategoryId)
        const newCheckedCategoryId = [...checked]
        //if currently checked was not already in the state we want to push, otherwise pull/splice
        if(currentCategoryId===-1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)

        handleFilters(newCheckedCategoryId)
    }
   
     return   categories.map((c, i)=>(
            <li key={i} className="list-unstyled">
                <input 
                    onChange = {handleToggle(c._id)} 
                    value={checked.indexOf(c._id===-1)} 
                    type="checkbox" 
                    className="form-check-input"/>
                <label className="form-check-label">{c.name}</label>
            </li>
        ))}
    


export default CheckBox
