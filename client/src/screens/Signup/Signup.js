import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { getError } from "../../uttils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Signup.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Testimonials from "../../components/Testimonials/Testimonials";


const Signup = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try{
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password,

            });
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);


    return (
       <div className='sign-in mx-auto'>
        <Helmet>
            <title>Sign Up</title>
        </Helmet>
        <Row>
            <Col md={4} className="testimonials hidden md:block">
                <Testimonials />
            </Col>
            <Col md={5} className="sign mx-auto w-[90%] md:w-[30%]">
                <div className="relative mb-3">
                        <Link to="/">
                            <AiOutlineArrowLeft className="back-arrow"/>
                        </Link>
                        <p className="back">Back to Home page</p>
                </div>
                <div className="form">
                    <div className="">
                        <h1 className="mb-1 font-bold">Create an account</h1>
                        <p>Welcome back! Kindly enter your details to sign up.</p>
                    </div>
                    <Form className="main-form" onSubmit={submitHandler}>
                        <Form.Group className="mb-3 grid" controlId="name">
                                <Form.Label className="label">Name</Form.Label>
                                <input type="text" placeholder="Enter your name"  required onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3 grid" controlId="email">
                                <Form.Label className="label">Email</Form.Label>
                                <input type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3 grid" controlId="password">
                                <Form.Label className="label">Password</Form.Label>
                                <input type="password" placeholder="*******" required onChange={(e) => setPassword(e.target.value)}/>
                                <p className="pt-2">Must be atleast 8 characters</p>
                        </Form.Group>
                        <Form.Group className="mb-3 grid" controlId="confirmpassword">
                                <Form.Label className="label">Confirm Password</Form.Label>
                                <input type="password" placeholder="*******" required onChange={(e) => setconfirmPassword(e.target.value)}/>
                        </Form.Group>
                        <div className="mb-3 mt-4 d-grid">
                                <Button className="button py-2 border-none text-white" type="submit">Sign Up</Button>
                        </div>
                        <div className="have-account text-center">
                            Already have an account?{' '}
                            <Link className="forgot-password" to={`/signin?redirect=${redirect}`}>Sign In</Link>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>

        
       </div>
    )
}

export default Signup;