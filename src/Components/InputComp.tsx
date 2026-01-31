import React from 'react'
import "../styles/InputCompStyle.css"

interface TheProps{
  label: string;
  theName: string;
  theId: string;
  theType: string;
  isRequired: boolean;
}

const InputComp:React.FC<TheProps> = ({label, theName, theId, theType, isRequired}) => {
  return (
    <div style={{width:"100%", height:"12%",}}>
        <label style={{fontSize:"20px",}}>{label}</label><br />
        <input className='theField' name={theName} id={theId} type={theType} required={isRequired} />
    </div>
  )
}

export default InputComp
