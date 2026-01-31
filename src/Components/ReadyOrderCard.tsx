// Components/ReadyOrderCard.tsx - COMPLETE FIXED VERSION
import React from 'react'
import "../styles/ReadyOrderCardStyle.css"
import type { UIOrder, OrderStatus } from '../types/restaurant.types';

interface TheProps{
    order: UIOrder;
    onStatusUpdate?: (status: OrderStatus) => void;
}

const ReadyOrderCard: React.FC<TheProps> = ({ order, onStatusUpdate }) => {
  const handleMarkAsDelivered = () => {
    if (onStatusUpdate) {
      onStatusUpdate('delivered');
    }
  };

  const handleMarkAsCollected = () => {
    if (onStatusUpdate) {
      onStatusUpdate('delivered'); // Same as delivered for pickup
    }
  };

  const isDelivery = order.deliveryType === 'delivery';
  const buttonText = isDelivery ? 'Mark as Delivered' : 'Mark as Collected';

  // Parse items if they're stored as JSON string (backward compatibility)
  const items = Array.isArray(order.items) 
    ? order.items 
    : typeof order.items === 'string' 
      ? JSON.parse(order.items || '[]')
      : [];

  const firstItem = items[0];

  return (
    <div className='readyCardContainer'>
        <div className='mealImg' style={{backgroundImage: `url(${'https://via.placeholder.com/150'})`}}/>
        <div className='mealData'>
            <strong style={{fontSize:"20px", color:"#ffb20c"}}>#{order.orderNumber}</strong>
            <strong style={{fontSize:"18px", lineHeight:"15px" }}>
              {firstItem?.mealName || 'Order'}
              {items.length > 1 && ` +${items.length - 1}`}
            </strong>
            <strong style={{fontSize:"16px", lineHeight:"15px" }}>{order.customerName}</strong>
            <div style={{ width:"100%", height:"30%", marginTop:"2%", display:"flex", justifyContent:"end"}}>
                <button 
                  className='readyBtn'
                  onClick={isDelivery ? handleMarkAsDelivered : handleMarkAsCollected}
                >
                    <strong>{buttonText}</strong>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ReadyOrderCard;