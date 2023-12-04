import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Row from "react-bootstrap/Row";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Col from "react-bootstrap/Col";
import './CheckEmail.css';
import Testimonials from '../../components/Testimonials/Testimonials';



const CheckEmail = () =>  {

  
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
            <div className="sign-in md:w-[60%] mx-auto">
              <div className="sign-in-content md:w-[50%] mx-auto py-14 w-[92%] px-3">
                      <div className="form">
                          <div className="">
                              <h1 className="mb-1 font-bold">Check your email</h1>
                              <p> We have sent a password reset link to your email address. 
                                  Kindly check your inbox and click on the link to reset your password. 
                                  Don’t forget to check your spam folder, if you can’t find the mail.</p>
                          </div>
                          <Form className="main-form">
                              <div className="mb-3 mt-4">
                              <Link to="/forget-password" className='d-grid'><Button className="button py-2 border-none text-white" type="submit">Resend Link</Button></Link>
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

export default CheckEmail;
