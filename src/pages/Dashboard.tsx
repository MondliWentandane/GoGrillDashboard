import React from 'react'
import "../styles/DashboardStyles.css"
import NewOrderCard from '../Components/NewOrderCard';
import ReadyOrderCard from '../Components/ReadyOrderCard';
import GetReadyOrderCard from '../Components/GetReadyOrderCard';
import theImg from '../assets/images/image2.png'
import theImg2 from '../assets/images/image2.png'
import theImg3 from '../assets/images/image2.png'

const Dashboard:React.FC = () => {
  return (
    <div className='containerD'>
      <div className='leftBlock'>
        <div className='horizontCards'>
          <NewOrderCard orderNo={24342} mealName='Unwise Street' delivery={true} quantity={3} imgUrl={theImg}/>

        </div>
        <div className='verticalCards'>
          <div className="vLeft">
            <div className='headers'>
              <strong>Ready for Collection</strong>
            </div>
            <div className='vSlider'>
              <ReadyOrderCard/>
            </div>
          </div>
          <div className="vRight">
            <div className='headers'>
              <strong>Ready for Collection</strong>
            </div>
            <div className='vSlider'>
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
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
