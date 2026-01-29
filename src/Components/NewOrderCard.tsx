import React from 'react'
import "../styles/NewOrderCardStyles.css"

const NewOrderCard:React.FC = () => {
  return (
    <div className='cardNew'>
        <div className='imgHolder'>
            <div className='statusCard'><p>Not Ready</p></div>
        </div>
        <div className="infoBottom">
            <strong style={{fontSize:"larger", color:"#fdab07"}}>23234</strong>
            <strong style={{lineHeight:"10px"}}>UnWise Street</strong>
            <div className='lastLast'>
                <strong style={{fontSize:"13px",}}>Delivery</strong>
                <strong>X2</strong>
            </div>
        </div>
    </div>
  )
}

export default NewOrderCard