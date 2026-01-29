import React from 'react'
import "../styles/SearchHoStyle.css"
import { Link } from 'react-router-dom';

interface TheProps{
    text: string;
    iconUrl: string;
    pagePath: string;
}


const sectionHolder: React.FC<TheProps> = ({text, iconUrl, pagePath}) => {
  return (
    <div className='container'>
        <Link to={pagePath} style={{display:'flex', flexDirection:"row",gap:"5%", 
                                    textDecoration:"none", color:"inherit", alignItems:"center", width:"100%"}}>
           <img src={iconUrl} style={{width:50, height:50}} />
           <strong>{text}</strong>
        </Link>
    </div>
  )
}

export default sectionHolder;