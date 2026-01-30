import React from 'react'
import "../styles/NavStyles.css"
import SectionHolder from './SectionHolder'
import dashIcon from "../assets/icons/dashboardIconBlack.png"
import mealsIcon from "../assets/icons/mealsIconBlack.png"
import addIcon from "../assets/icons/addIconBlack.png"
import settiongIcon from "../assets/icons/settingIconBlack.png"

const Navbar: React.FC = () => {
  return (
    <nav className='mainNav'>
      <div className='sectOne'>
        <SectionHolder pagePath='./' iconUrl={dashIcon} text='Dashboard'/>
        <SectionHolder pagePath='/mealsList' iconUrl={mealsIcon} text='Available Meals'/>
        <SectionHolder pagePath='/addMealsP' iconUrl={addIcon} text='Add New Meal'/>
      </div>
      <div className='sectTwo'>
        <SectionHolder pagePath='/settingsP' iconUrl={settiongIcon} text='Settings'/>
      </div>
    </nav>
  )
}

export default Navbar;
