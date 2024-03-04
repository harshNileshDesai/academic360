import React from 'react';

/**
 * ButtonClick component represents a basic ButtonClick.
 *
 * @param {Object} props - The properties of the ButtonClick component.
 * @param {string} props.buttonText - The text to be displayed on the ButtonClick.
 * @param {function} props.onClick - The function to be executed when the ButtonClick is clicked.
 * @returns {JSX.Element} The rendered ButtonClick component.
 */
const ButtonClick = ({ bgColor = 'bg-slate', buttonText = '', onClick = () => { }, disabled = false }) => {
  return (
    <>
      <button 
        onClick={onClick} 
        type='button' 
        disabled={disabled} 
        className={` ${bgColor}-500 hover:${bgColor}-600 ${bgColor!=='bg-white' ? 'text-white' : 'text-black text-xl '} font-semibold px-4 py-2 rounded-md`} 
      >
        {buttonText}
      </button>
    </>
  );
}

export default ButtonClick;