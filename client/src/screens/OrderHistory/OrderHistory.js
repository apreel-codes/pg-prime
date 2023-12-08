import axios from 'axios';
// import apiClient from '../api';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet-async";
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Container from 'react-bootstrap/Container';
import { Store } from '../../Store';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { getError } from '../../uttils';
import Button from 'react-bootstrap/Button';
import './OrderHistory.css';


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
            case 'FETCH_SUCCESS':
                return { ...state, orders: action.payload, loading: false };
                case 'FETCH_FAIL':
                    return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


const OrderHistory = () => {
    const { state} = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    console.log(orders);


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(`/api/orders/mine`,
                { headers: {Authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        fetchData();
    }, [userInfo ])


    return (
        <div className=''>
            <Helmet>
            <title>Order History</title>
            </Helmet>
            <Header />
            <div className='orderhistory-page md:w-[80%] w-[90%] my-10 mx-auto'>
                <h1 className='my-3 text-xl font-bold'>Order History</h1>

                {loading ? (
                        <LoadingBox></LoadingBox>
                ) : error ? (
                     <MessageBox variant='danger'>{error}</MessageBox>
                ) : (
                    <div>
                        { orders.length === 0 ? (
                            <p className='no-order'>You have not made any orders yet.</p>
                             ) : (
                                <table className='table mt-3'>
                                    <thead className="">
                                            <tr className=''>
                                                <th>ID</th>
                                                <th>DATE</th>
                                                <th>DETAILS</th>
                                                <th>TOTAL</th>
                                                {/* <th>ACTIONS</th> */}
                                            </tr>
                                    </thead>
                                    <tbody>
                                            { orders.map((order) => (
                                                <tr key={order._id} className=''>
                                                    <td><span className='md:hidden mobile-header block font-semibold'>ID:&nbsp;</span>{order._id.slice(0, 8)}</td>
                                                    <td><span className='md:hidden mobile-header block font-semibold'>DATE:&nbsp;</span>{order.createdAt.substring(0, 10)}</td>
                                                    <td><span className='md:hidden mobile-header block font-semibold'>DETAILS:&nbsp;</span>{order.orderItems.map((o, index) => (
                                                        <p key={index}>{o.name}({o.quantity}).&nbsp;</p>
                                                    ))}
                                                    </td>
                                                    <td><span className='md:hidden mobile-header block font-semibold'>TOTAL:&nbsp;</span>₦{order.totalPrice.toFixed(2)}</td>
                                                    {/* <td>
                                                        <Button
                                                            className='text-blue-800 border-blue-800'
                                                            type='button'
                                                            
                                                            onClick={() => {
                                                                navigate(`/order/${order._id}`);
                                                            }}
                                                        >Details</Button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                             )
                        }
                    </div>     
                   
                )}
            </div>
            <Footer />
        </div>
    )
}

export default OrderHistory;
