import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Store } from '../../Store';
import { getError } from '../../uttils';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './UserEdit.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function UserEdit() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('User updated successfully');
      navigate('/admin/userlist');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  return (
    <div className=''>
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <Header />
      <div className='edit-user-page md:w-[40%] w-[90%] my-12 md:my-20 mx-auto'>
          <h1 className="my-3 text-xl font-bold">Update user</h1>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4 grid" controlId="name">
                  <Form.Label className="edit-user-label">Name</Form.Label>
                  <input
                    className='input text-sm w-full'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4 grid" controlId="email">
                  <Form.Label className="edit-user-label">Email</Form.Label>
                  <input
                    className='input text-sm w-full'
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Check
                  className=" mb-3"
                  type="checkbox"
                  id="isAdmin"
                  label="Give admin role"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />


                <div className="edit-user-button-group flex mt-2 flex-row justify-between items-center">
                    <div>
                      <Button className="edit-user-cancel-button border-none w-full" type="">
                        <Link to='/admin/userlist'>Cancel</Link>
                      </Button>
                    </div>
                    <div className="mb-3 d-grid">
                      <Button disabled={loadingUpdate}
                      className="edit-user-button border-none text-white w-full"
                      type="submit">
                       Save changes
                      </Button>
                      {loadingUpdate && <LoadingBox></LoadingBox>}
                    </div>
                </div>
                
              </Form>
            )}
      </div>
      <Footer />
    </div>
  );
}