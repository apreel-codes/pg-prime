import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Col from "react-bootstrap/Col";
import './CheckEmail.css';
import Testimonials from '../../components/Testimonials/Testimonials';



const CheckEmail = () =>  {

  
  return (
    <div className='sign-in mx-auto'>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <Row className="">
        <Col md={4} className="testimonials hidden md:block">
                <Testimonials />
        </Col>
        <Col md={5} className="sign mx-auto w-[90%] md:w-[30%]">
                <div className="relative mb-3">
                    <Link to="/signin">
                        <AiOutlineArrowLeft className="back-arrow"/>
                    </Link>
                    <p className="back">Back to Sign in</p>
                </div>
                <div className="form">
                    <div className="">
                        <h1 className="mb-1 font-bold">Check your email</h1>
                        <p> We have sent a password reset link to your email address. 
                            Kindly check your inbox and copy the code to reset your password. 
                            Don’t forget to check your spam folder, if you can’t find the mail.</p>
                    </div>
                    <Form className="main-form">
                        <div className="mb-3 mt-4">
                        <Link to="/forget-password" className='d-grid'><Button className="button py-2 border-none text-white" type="submit">Resend Link</Button></Link>
                        </div>
                    </Form>
                </div>

        </Col>
      </Row>
    </div>
  );
}

export default CheckEmail;
