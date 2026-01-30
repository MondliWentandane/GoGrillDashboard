import React from 'react'
import "../styles/NewOrderCardStyles.css"

interface TheProps{
    orderNo: number;
    mealName: string;
    quantity: number;
    delivery: boolean;
    imgUrl: string;
}

const getOrderType = (delivery: boolean): string => {
      return delivery ? "Delivery" : "Collection";
    };

const NewOrderCard:React.FC<TheProps> = ({orderNo, mealName, quantity, delivery, imgUrl}) => {
  return (
    <div className='cardNew'>
        <div className='imgHolder' style={{backgroundImage:`url(${imgUrl})`}}>
            <div className='statusCard'><strong>Not Ready</strong></div>
        </div>
        <div className="infoBottom">
            <div>
                <strong style={{fontSize:"larger", color:"#fdab07"}}>{orderNo}</strong> <br />
                <strong style={{lineHeight:"10px"}}>{mealName}</strong>
            </div>
            <div className='lastLast'>
                <strong style={{fontSize:"13px",}}>{getOrderType(delivery)}</strong>
                <strong>X{quantity}</strong>
            </div>
        </div>
    </div>
  )
}

export default NewOrderCard