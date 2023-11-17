import axios from 'axios';
// import apiClient from '../api';
import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../../Store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { toast } from "react-toastify";
import { getError } from '../../uttils';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
// import axios from 'axios';
import './Profile.css';


const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
            case 'UPDATE_SUCCESS':
                return { ...state, loadingUpdate: false };
                case 'UPDATE_FAIL':
                    return { ...state, loadingUpdate: false }

        default:
            return state;
    }
};

const Profile = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [passwordtype, setPasswordType] = useState('password');
    const [confirmPasswordtype, setConfirmPasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(eyeOff);
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);

    const [{ loadingUpdate }, dispatch ] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const handleToggle = () => {
        if (passwordtype === 'password'){
            setPasswordIcon(eye);
            setPasswordType('text')
        } else {
            setPasswordIcon(eyeOff)
            setPasswordType('password')
        }
     }

     const handleConfirmToggle = () => {
        if (confirmPasswordtype === 'password'){
            setConfirmPasswordIcon(eye);
            setConfirmPasswordType('text')
         } else {
            setConfirmPasswordIcon(eyeOff)
            setConfirmPasswordType('password')
         }
     }


    const submitHandler = async (e) => {
        e.preventDefault();
        if(!name || !email || !password){
            toast.error('Please complete all fields');
            return;
        }
        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try{
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}`},
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
            toast.success('User updated successfully!');
            return;
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error('Oops! Something went wrong.');
            return;
        }

    }

    return (
        <div>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Header />
            <div className='profile-page md:w-[40%] w-[90%] mx-auto my-12 md:my-20'>
                <h1 className="">Account Details</h1>
                <p>Edit your name and email address...</p>
                <form className="profile-main-form" onSubmit={submitHandler}>
                        <Form.Group className="mb-4 grid" controlId="name">
                                <Form.Label className="label">Name</Form.Label>
                                <input 
                                    className='w-full'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-4 grid" controlId="name">
                                <Form.Label className="label">Email</Form.Label>
                                <input 
                                    className='w-full'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                        </Form.Group>
                        <Form.Group className="mb-1 grid" controlId="name">
                            <Form.Label className="label" >Password</Form.Label>
                                    <div className="mb-2 flex">
                                        <input 
                                            className='w-full'
                                            type={passwordtype}
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span class="flex justify-around items-center" onClick={handleToggle}>
                                            <Icon class="absolute mr-10" icon={passwordIcon} size={20}/>
                                        </span>
                                    </div>          
                                    <p className="">Must be atleast 8 characters</p>
                        </Form.Group>
                        <Form.Group className="mb-5 grid" controlId="confirmpassword">
                        <Form.Label className="label" >Confirm Password</Form.Label>
                                <div className="flex">
                                    <input 
                                        className='w-full'
                                        type={confirmPasswordtype}
                                        value={confirmPassword} 
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span class="flex justify-around items-center" onClick={handleConfirmToggle}>
                                        <Icon class="absolute mr-10" icon={confirmPasswordIcon} size={20}/>
                                    </span>
                                </div>          
                        </Form.Group>
                        <div className='profile-button-group flex flex-row justify-between items-center'>
                            <div className="">
                                    <Button className="profile-cancel-button border-none w-full" type="">
                                        <Link to="/">Cancel</Link>
                                    </Button>
                            </div>
                            <div className="">
                                    <Button className="profile-button border-none text-white w-full" type="submit">Save changes</Button>
                            </div>
                        </div>
                        
                    </form>

            </div>
            <Footer />
        </div>
    )
}

export default Profile;