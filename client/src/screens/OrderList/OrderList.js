import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { CSVLink } from "react-csv";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Store } from '../../Store';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getError } from '../../uttils';
import './OrderList.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};


export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

    console.log(orders);


let newOrders;

if(orders){
  newOrders = orders.map(order => ({
    ...order, // spread the existing properties
    id: order._id,
    date: order.createdAt.substring(0, 10),
    buyer: order.user.name,
    name: order.orderItems.map((o) => {
      return o.name;
    }),
    size: order.orderItems.map((o) => {
      return o.size;
    }),
    quantity: order.orderItems.map((o) => {
      return o.quantity;
    }),
    itemPrice: order.itemsPrice,
    shippingCost: order.shippingPrice,
    totalCost: order.totalPrice,
    phone: order.shippingAddress.phonenumber,
    address: order.shippingAddress.address,
    city: order.shippingAddress.city,
    country: order.shippingAddress.country,
    payment: order.paymentMethod,
  }));
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <div className=''>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <Header />
      <div className='orderlist-page md:w-[80%] w-[90%] my-10 mx-auto'>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='my-3 text-xl font-bold'>Orders</h1>
          <div className='csv-button'>
                { newOrders  &&
                <CSVLink data={newOrders}>Export</CSVLink>
                
                }
          </div>
        </div>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            { orders.length === 0 ? (
                  <p className='no-order'>There are no orders yet.</p>
                  ) : (
                    <table className="table mt-3">
                          <thead>
                          <tr className=''>
                                  <th>ID</th>
                                  <th>USER</th>
                                  <th>DATE</th>
                                  <th>DETAILS</th>
                                  <th>TOTAL</th>
                                  <th>ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                                    { orders.map((order) => (
                                    <tr key={order._id}>
                                      <td><span className='md:hidden mobile-header block font-semibold'>ID:&nbsp;</span>{order._id.slice(0, 8)}</td>
                                      <td><span className='md:hidden mobile-header block font-semibold'>USER:&nbsp;</span>{order.user ? order.user.name : 'DELETED USER'}</td>
                                      <td><span className='md:hidden mobile-header block font-semibold'>DATE:&nbsp;</span>{order.createdAt.substring(0, 10)}</td>
                                      <td><span className='md:hidden mobile-header block font-semibold'>DETAILS:&nbsp;</span>{order.orderItems.map((o, index) => (
                                          <p key={index}>{o.name}({o.quantity}).&nbsp;</p>
                                      ))}
                                      </td>
                                      <td><span className='md:hidden mobile-header block font-semibold'>TOTAL:&nbsp;</span>₦{order.totalPrice.toFixed(2)}</td>
                                      {/* <td><span className='md:hidden mobile-header block font-semibold'>PAID:&nbsp;</span>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td> */}
                                      <td>
                                        {/* <Button
                                          className='text-blue-800 border-blue-800'
                                          type="button"
                                          
                                          onClick={() => {
                                            navigate(`/order/${order._id}`);
                                          }}
                                        >
                                          Details
                                        </Button> */}
                                        
                                        <Button
                                          type="button"
                                          className='bg-red-600 text-gray-100 border-none'
                                          
                                          onClick={() => deleteHandler(order)}
                                        >
                                          Delete
                                        </Button>
                                      </td>
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
);
}