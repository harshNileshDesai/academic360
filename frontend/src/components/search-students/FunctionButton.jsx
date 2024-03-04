import React from 'react'

const FunctionButton = ({ bgColor = 'bg-slate', buttonText = '', onClick = () => { }, disabled = false }) => {
  return (
    <button 
        onClick={onClick} 
        type='button' 
        disabled={disabled} 
        className={`${bgColor}-500 hover:${bgColor}-600 text-white  font-semibold rounded-full p-1`} 
      >
        {buttonText}
      </button>
  )
}

export default FunctionButton