import React from 'react'
import "../styles/GetReadyOrderCard.css"

interface TheProps{
    orderNo: number;
    mealName: string;
    customerName: string;
    imgUrl: string
}

const GetReadyOrderCard:React.FC<TheProps> = ({orderNo, mealName, customerName, imgUrl}) => {
  return (
    <div className='readyCardContainerG'>
        <div className='mealImg' style={{backgroundImage:`url(${imgUrl})`}}/>
        <div className='mealData'>
            <strong style={{fontSize:"20px", color:"#ffb20c"}}>{orderNo}</strong>
            <strong style={{fontSize:"18px", lineHeight:"15px" }}>{mealName}</strong>
            <strong style={{fontSize:"16px", lineHeight:"15px" }}>{customerName}</strong>
            <div style={{ width:"100%", height:"30%", 
                        marginTop:"2%", display:"flex", justifyContent:"end"}}>
                <div className='readyBtnG'>
                    <strong>Preparing</strong>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GetReadyOrderCard;