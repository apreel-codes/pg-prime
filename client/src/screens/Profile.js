import axios from 'axios';
// import apiClient from '../api';
import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../Store';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { toast } from "react-toastify";
import { getError } from '../uttils';
// import axios from 'axios';


const reducer = (state, action) => {
    switch ( action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
            case 'UPDATE_SUCCESS':
                return { ...state, loadingUpdate: false };
                case 'UPDATE_FAIL':
                    return { ...state, loadingUpdate: false }

        default:
            return state;
    }
}

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

    const [{ loadingUpdate }, dispatch ] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
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
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error(getError(err));
        }

    }

    return (
        <div className='md:w-[40%] w-[90%] my-10 mx-auto'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <h1 className="my-3 text-2xl font-bold">Profile</h1>
                <form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" ControlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" ControlId="name">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" ControlId="name">
                        <Form.Label>Pasword</Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" ControlId="name">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            type="password"
                        ></Form.Control>
                    </Form.Group>
                    <div className='mb-3 mt-4 d-grid'>
                        <Button className='bg-black py-3 rounded-full text-gray-100 border-none' type="submit">Update</Button>
                    </div>
                </form>
        </div>
    )
}

export default Profile;