import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../uttils';
import { Store } from '../../Store';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Row from "react-bootstrap/Row";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Col from "react-bootstrap/Col";
import './ForgotPassword.css';
import Testimonials from '../../components/Testimonials/Testimonials';


const ForgotPassword = () =>  {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/forget-password', {
        email,
      });
      toast.success(data.message);
      navigate('/check-email');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className=''>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <Header />
        <div className='mx-auto'>
          <div className="flex flex-row">
            <div className="web-test hidden md:block">
                    <Testimonials />
            </div>
            <div className="forgot-password-content md:w-[60%] mx-auto">
              <div className="forgot-password-content md:w-[50%] mx-auto py-14 w-[100%] px-3">
                      <div className="form">
                          <div className="">
                              <h1 className="mb-1 font-bold">Forgot your password?</h1>
                              <p>We will send you a reset link.</p>
                          </div>
                          <Form className="main-form" onSubmit={submitHandler}>
                              <Form.Group className="mb-3 grid" controlId="email">
                              <Form.Label className="label">Email</Form.Label>
                              <input
                                  type="email"
                                  placeholder="Enter your email"
                                  required
                                  onChange={(e) => setEmail(e.target.value)}
                              />
                              </Form.Group>

                              <div className="mb-3 mt-4 d-grid">
                              <Button className="button py-2 border-none text-white" type="submit">Reset Password</Button>
                              </div>
                          </Form>
                      </div>

              </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
