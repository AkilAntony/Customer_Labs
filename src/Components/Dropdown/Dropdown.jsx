import React ,{useState}from 'react'
import './Dropdown.css'

const Dropdown = ({handleChange,options}) => {
   
  return (
    <div>
         <select onClick={(e) => handleChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
