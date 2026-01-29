import React from 'react'
import "../styles/DashboardStyles.css"
import NewOrderCard from '../Components/NewOrderCard';
const Dashboard:React.FC = () => {
  return (
    <div className='containerD'>
      <div className='leftBlock'>
        <div className='horizontCards'>
          <NewOrderCard/>
          <NewOrderCard/>
          <NewOrderCard/>
          <NewOrderCard/>

        </div>
        <div className='verticalCards'></div>
      </div>
      <div className='rightBlock'></div>
    </div>
  )
}

export default Dashboard;
