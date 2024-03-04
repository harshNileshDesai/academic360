import React, { useState } from 'react'
import Input from '../form-controls/Input'
import ButtonSubmit from '../form-controls/ButtonSubmit'
import Swal from 'sweetalert2';
import { getLogin } from '../../app/api/authApi';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../app/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { toogleLoading } from '../../app/features/loadingSlice';
import { jwtDecode } from "jwt-decode";
import md5 from 'md5';

const LoginForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (credentials.email === '' || credentials.password === '') {
            Swal.fire({
                title: 'Alert',
                text: 'Please enter the fields.',
                icon: 'error', // Options: 'success', 'error', 'warning', 'info'
            });
            return;
        }
        dispatch(toogleLoading());
        const data = await getLogin(credentials);
        dispatch(toogleLoading());
        if (data.error) {
            console.log(data.error);
            return;
        }
        const decodedData = jwtDecode(data.data.payload);
        console.log(decodedData);
        dispatch(setAuth({ profile: data.data.payload }))
        const emailHash = md5(document.getElementById('email').value);
        const avatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
        localStorage.setItem('picture', JSON.stringify(avatarUrl));

        navigate('/dashboard', { replace: true });
    }

    return (
        <form className='h-2/3 flex flex-col items-center gap-2 px-2' onSubmit={handleLogin}>
            <div className="email w-full sm:min-w-[66%] ">
                <Input
                    type="email"
                    htmlFor="email"
                    label=''
                    placeholder='Enter your email...'
                    value={credentials.email}
                    onChange={handleChange}
                />
            </div>
            <div className="password w-full sm:min-w-[66%] ">
                <Input
                    type="password"
                    htmlFor="password"
                    label=''
                    placeholder='Enter your password...'
                    value={credentials.password}
                    onChange={handleChange}
                />
            </div>
            <ButtonSubmit bgColor="bg-blue" buttonText='Login' />
        </form>
    )
}

export default LoginForm