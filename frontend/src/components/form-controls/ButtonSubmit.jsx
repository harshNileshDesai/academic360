import React from 'react';

/**
 * ButtonSubmit component represents a basic ButtonSubmit.
 *
 * @param {Object} props - The properties of the ButtonSubmit component.
 * @param {string} props.buttonText - The text to be displayed on the ButtonSubmit.
 * @param {function} props.onClick - The function to be executed when the ButtonSubmit is clicked.
 * @returns {JSX.Element} The rendered ButtonSubmit component.
 */
const ButtonSubmit = ({ bgColor = 'bg-slate', buttonText = '' }) => {
  return (
    <>
      <button className={`${bgColor}-500 hover:${bgColor}-600 text-white font-semibold px-4 py-2 rounded-md`} >{buttonText}</button>
    </>
  );
}

export default ButtonSubmit;