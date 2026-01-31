// Components/NewOrderCard.tsx - COMPLETE FIXED VERSION
import React from 'react'
import "../styles/NewOrderCardStyles.css"
import type { UIOrder, OrderStatus } from '../types/restaurant.types';

interface TheProps{
    order: UIOrder;
    onStatusUpdate?: (status: OrderStatus) => void;
}

const getOrderType = (deliveryType: 'delivery' | 'pickup'): string => {
      return deliveryType === 'delivery' ? "Delivery" : "Collection";
    };

const NewOrderCard: React.FC<TheProps> = ({ order, onStatusUpdate }) => {
  // Parse items if they're stored as JSON string (backward compatibility)
  const items = Array.isArray(order.items) 
    ? order.items 
    : typeof order.items === 'string' 
      ? JSON.parse(order.items || '[]')
      : [];

  const totalItems = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
  const firstItem = items[0];

  const handleConfirm = () => {
    if (onStatusUpdate) {
      onStatusUpdate('confirmed');
    }
  };

  const handleCancel = () => {
    if (onStatusUpdate) {
      onStatusUpdate('cancelled');
    }
  };

  return (
    <div className='cardNew'>
        <div className='imgHolder' style={{backgroundImage: `url(${'https://via.placeholder.com/150'})`}}>
            <div className='statusCard'><strong>{order.status.toUpperCase()}</strong></div>
        </div>
        <div className="infoBottom">
            <div>
                <strong style={{fontSize:"larger", color:"#fdab07"}}>#{order.orderNumber}</strong> <br />
                <strong style={{lineHeight:"10px"}}>{firstItem?.mealName || 'Order'}</strong>
                {items.length > 1 && (
                  <p style={{ fontSize: '12px', margin: 0 }}>+{items.length - 1} more items</p>
                )}
            </div>
            <div className='lastLast'>
                <strong style={{fontSize:"13px",}}>{getOrderType(order.deliveryType)}</strong>
                <strong>X{totalItems}</strong>
            </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '5px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Confirm
          </button>
          <button 
            onClick={handleCancel}
            style={{
              flex: 1,
              padding: '5px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
    </div>
  )
}

export default NewOrderCard;