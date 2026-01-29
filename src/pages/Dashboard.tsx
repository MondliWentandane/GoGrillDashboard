import React from 'react'
import "../styles/DashboardStyles.css"
import NewOrderCard from '../Components/NewOrderCard';
import ReadyOrderCard from '../Components/ReadyOrderCard';
import GetReadyOrderCard from '../Components/GetReadyOrderCard';
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
        <div className='verticalCards'>
          <div className="vLeft">
            <div className='headers'>
              <strong>Ready for Collection</strong>
            </div>
            <div className='vSlider'>
              <ReadyOrderCard/>
              <ReadyOrderCard/>
              <ReadyOrderCard/>
            </div>
          </div>
          <div className="vRight">
            <div className='headers'>
              <strong>Ready for Collection</strong>
            </div>
            <div className='vSlider'>
              <ReadyOrderCard/>
              <ReadyOrderCard/>
              <ReadyOrderCard/>
            </div>
          </div>
        </div>
      </div>
      <div className='rightBlock'>
        <div className='headerRight'>
              <strong>Getting Ready</strong>
        </div>
        <div className='vSliderTwo'>
          <GetReadyOrderCard/>
          <GetReadyOrderCard/>
          <GetReadyOrderCard/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
