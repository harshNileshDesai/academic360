import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";

const Input = ({ type, htmlFor = '', label = '', placeholder = '', value, onChange }) => {

    const [isPasswordView, setIsPasswordView] = useState(true);
    
    const handlePasswordView = () => {
        const input = document.getElementById(htmlFor);
        if(isPasswordView) {
            input.setAttribute('type', 'text');
        }
        else {
            input.setAttribute('type', 'password');
        }
        setIsPasswordView(!isPasswordView);
    }

    return (
        <>
            <label htmlFor={htmlFor}>{label}</label>
            <div className={`border border-slate-300 rounded-md px-4 py-2 ${type.toLowerCase() === 'password' ? 'flex justify-between' : ''} `}>
                <input 
                    type={type.toLowerCase()} 
                    name={htmlFor} 
                    id={htmlFor} 
                    placeholder={placeholder} 
                    className=' outline-none w-full' 
                    value={value}
                    onChange={onChange}
                />
                {type.toLowerCase() === 'password' && <button type='button' onClick={handlePasswordView} className={`rounded-full p-1 hover:bg-slate-200 ${isPasswordView ? 'bg-slate-200' : ''} `}><FaRegEyeSlash /></button>}
            </div>
        </>
    )
}

export default Input