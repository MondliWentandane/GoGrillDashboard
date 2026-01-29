import React from 'react'
import "../styles/GetReadyOrderCard.css"

const GetReadyOrderCard:React.FC = () => {
  return (
    <div className='readyCardContainer'>
        <div className='mealImg'/>
        <div className='mealData'>
            <strong style={{fontSize:"20px", color:"#ffb20c"}}>23224</strong>
            <strong style={{fontSize:"18px", lineHeight:"15px" }}>Unwise Street</strong>
            <strong style={{fontSize:"16px", lineHeight:"15px" }}>Paole Jobe</strong>
            <div style={{ width:"100%", height:"30%", 
                        marginTop:"2%", display:"flex", justifyContent:"end"}}>
                <div className='readyBtn'>
                    <strong>Ready</strong>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GetReadyOrderCard;