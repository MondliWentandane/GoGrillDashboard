import React from 'react'
import "../styles/DashboardStyles.css"
import NewOrderCard from '../Components/NewOrderCard';
import ReadyOrderCard from '../Components/ReadyOrderCard';
import GetReadyOrderCard from '../Components/GetReadyOrderCard';
import theImg from '../assets/images/image2.png'
import theImg2 from '../assets/images/image.png'
import theImg3 from '../assets/images/image3.png'

const Dashboard:React.FC = () => {
  return (
    <div className='containerD'>
      <div className='leftBlock'>
        <div className='horizontCards'>
          <NewOrderCard orderNo={24342} mealName='Unwise Street' delivery={true} quantity={1} imgUrl={theImg}/>
          <NewOrderCard orderNo={24342} mealName='Street Wise' delivery={false} quantity={3} imgUrl={theImg2}/>
          <NewOrderCard orderNo={24342} mealName='Dacker Dumpy' delivery={true} quantity={2} imgUrl={theImg}/>
          <NewOrderCard orderNo={24342} mealName='Unwise Street' delivery={false} quantity={6} imgUrl={theImg3}/>
        </div>
        <div className='verticalCards'>
          <div className="vLeft">
            <div className='headers'>
              <strong>Ready for Collection</strong>
            </div>
            <div className='vSlider'>
              <ReadyOrderCard orderNo={33332} mealName='Dump Str-Fry' customerName='John Baloyi' imgUrl={theImg3}/>
              <ReadyOrderCard orderNo={33542} mealName='Fried Meal' customerName='Anele Khoza' imgUrl={theImg}/>
              <ReadyOrderCard orderNo={36432} mealName='Platter Medium' customerName='Mondli Khoza' imgUrl={theImg2}/>
              <ReadyOrderCard orderNo={63332} mealName='Dump Str-Fry' customerName='Nkosingiplile Mbhele' imgUrl={theImg3}/>
            </div>
          </div>
          <div className="vRight">
            <div className='headers'>
              <strong>Ready for Collection</strong>
            </div>
            <div className='vSlider'>
              <ReadyOrderCard orderNo={63332} mealName='Dump Str-Fry' customerName='John Baloyi' imgUrl={theImg3}/>
              <ReadyOrderCard orderNo={33542} mealName='Fried Meal' customerName='Vutomu Juliose' imgUrl={theImg}/>
              <ReadyOrderCard orderNo={36432} mealName='Platter Medium' customerName='Mondli Khoza' imgUrl={theImg2}/>
              <ReadyOrderCard orderNo={85432} mealName='Ribbs & Sourcage' customerName='Xoliswa Khoza' imgUrl={theImg}/>
            </div>
          </div>
        </div>
      </div>
      <div className='rightBlock'>
        <div className='headerRight'>
              <strong>Getting Ready</strong>
        </div>
        <div className='vSliderTwo'>
          <GetReadyOrderCard orderNo={63332} mealName='Dump Str-Fry' customerName='John Baloyi' imgUrl={theImg3}/>
          <GetReadyOrderCard orderNo={85432} mealName='Ribbs & Sourcage' customerName='Xoliswa Khoza' imgUrl={theImg}/>
          <GetReadyOrderCard orderNo={33542} mealName='Fried Meal' customerName='Anele Khoza' imgUrl={theImg2}/>
          <GetReadyOrderCard orderNo={63332} mealName='Dump Str-Fry' customerName='Nkosingiplile Mbhele' imgUrl={theImg}/>
          <GetReadyOrderCard orderNo={33332} mealName='Dump Str-Fry' customerName='John Baloyi' imgUrl={theImg3}/>
          <GetReadyOrderCard orderNo={36432} mealName='Platter Medium' customerName='Mondli Khoza' imgUrl={theImg2}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
