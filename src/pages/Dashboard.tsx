// pages/Dashboard.tsx - COMPLETE FIXED VERSION
import React, { useEffect } from 'react'
import "../styles/DashboardStyles.css"
import NewOrderCard from '../Components/NewOrderCard';
import ReadyOrderCard from '../Components/ReadyOrderCard';
import GetReadyOrderCard from '../Components/GetReadyOrderCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchOrders, updateOrderStatus } from '../store/slices/ordersSlice';
import type { OrderStatus, UIOrder } from '../types/restaurant.types';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newOrders, preparingOrders, readyOrders, isLoading } = useAppSelector((state) => state.orders); // Removed unused 'orders'

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  // Filter orders by status - Use the already categorized arrays from state
  const pendingOrders = newOrders.filter((order: UIOrder) => order.status === 'pending');
  const preparingOrdersList = preparingOrders.filter((order: UIOrder) => 
    order.status === 'confirmed' || order.status === 'preparing'
  );
  const readyOrdersList = readyOrders.filter((order: UIOrder) => 
    order.status === 'ready'
  );

  if (isLoading) {
    return (
      <div className="containerD">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='containerD'>
      <div className='leftBlock'>
        <div className='horizontCards'>
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order: UIOrder) => (
              <NewOrderCard 
                key={order.id}
                order={order}
                onStatusUpdate={(status: OrderStatus) => handleStatusUpdate(order.id, status)}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
              <p>No new orders</p>
            </div>
          )}
        </div>
        <div className='verticalCards'>
          <div className="vLeft">
            <div className='headers'>
              <strong>Ready for Collection</strong>
            </div>
            <div className='vSlider'>
              {readyOrdersList.filter((order: UIOrder) => order.deliveryType === 'pickup').length > 0 ? (
                readyOrdersList
                  .filter((order: UIOrder) => order.deliveryType === 'pickup')
                  .map((order: UIOrder) => (
                    <ReadyOrderCard 
                      key={order.id}
                      order={order}
                      onStatusUpdate={(status: OrderStatus) => handleStatusUpdate(order.id, status)}
                    />
                  ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>No orders ready for collection</p>
                </div>
              )}
            </div>
          </div>
          <div className="vRight">
            <div className='headers'>
              <strong>Ready for Delivery</strong>
            </div>
            <div className='vSlider'>
              {readyOrdersList.filter((order: UIOrder) => order.deliveryType === 'delivery').length > 0 ? (
                readyOrdersList
                  .filter((order: UIOrder) => order.deliveryType === 'delivery')
                  .map((order: UIOrder) => (
                    <ReadyOrderCard 
                      key={order.id}
                      order={order}
                      onStatusUpdate={(status: OrderStatus) => handleStatusUpdate(order.id, status)}
                    />
                  ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>No orders ready for delivery</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='rightBlock'>
        <div className='headerRight'>
              <strong>Getting Ready</strong>
        </div>
        <div className='vSliderTwo'>
          {preparingOrdersList.length > 0 ? (
            preparingOrdersList.map((order: UIOrder) => (
              <GetReadyOrderCard 
                key={order.id}
                order={order}
                onStatusUpdate={(status: OrderStatus) => handleStatusUpdate(order.id, status)}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', width: '100%' }}>
              <p>No orders being prepared</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;