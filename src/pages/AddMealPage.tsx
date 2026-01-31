import React from 'react'
import '../styles/AddMealsStyles.css'
import InputComp from '../Components/InputComp'
import { Checkbox } from '@mui/material'

const AddMealPage:React.FC = () => {
  return (
    <div style={{width:"1005", height:"100%", fontFamily:"ui-rounded, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
       <strong style={{fontSize:"28px"}}>Add New Meal</strong>
      <div className='addContainer'>
      <div style={{width:"45%", height:"100%", display:"flex", flexDirection:"column", gap:"3%"}}>
        <InputComp label='Name of a Meal' theName='mealName' theId='mName' theType='text' isRequired={true}/>
        <InputComp label='Price' theName='mealPrice' theId='mPrice' theType='number' isRequired={true}/>
        <InputComp label='Category' theName='mCategory' theId='mCategory' theType='text' isRequired={true}/>
        <InputComp label='Estimated Time' theName='mealName' theId='mName' theType='text' isRequired={true}/>
        <textarea name="Description" id="mDesc" rows={7} cols={4} placeholder='Meal Description' className='descrField'/>
      </div>
      <div style={{width:"45%", height:"100%", display:"flex", flexDirection:"column", gap:"3%"}}>
        <InputComp label='Image Url' theName='mealImage' theId='mImg' theType='text' isRequired={true}/>
        <div>
          <span><Checkbox/>Reguler</span><span><Checkbox/>Populer</span><span><Checkbox/><strong>Discount</strong></span>
        </div>
        <InputComp label='Discount Percentage (if Discount Meal)' theName='mealPrice' theId='mPrice' theType='number' isRequired={true}/>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"85%", padding:"3px 9px 3px 9px"}}>
          <button id='buttonS' className='theCnl'>Cancel</button>
          <button id='buttonS' className='theAdd'>Add +</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddMealPage
