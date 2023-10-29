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
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';


const Signup = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [passwordtype, setPasswordType] = useState('password');
    const [confirmPasswordtype, setConfirmPasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(eyeOff);
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);

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

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (password.length <= 8) {
            toast.error('Password must be atleast 8 characters');
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
       <div className='sign-in'>
        <Helmet>
            <title>Sign Up</title>
        </Helmet>
        <Row className="">
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
                        <Form.Group className="mb-2 grid" controlId="password">
                        <Form.Label className="label" >Password</Form.Label>
                                <div className="mb-2 flex">
                                    <input 
                                        type={passwordtype}
                                        value={password} 
                                        placeholder="********" 
                                        required 
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span class="flex justify-around items-center" onClick={handleToggle}>
                                        <Icon class="absolute mr-10" icon={passwordIcon} size={20}/>
                                    </span>
                                </div>          
                                <p className="">Must be atleast 8 characters</p>
                        </Form.Group>
                        <Form.Group className="grid" controlId="confirmpassword">
                        <Form.Label className="label" >Confirm Password</Form.Label>
                                <div className="mb-4 flex">
                                    <input 
                                        type={confirmPasswordtype}
                                        value={confirmPassword} 
                                        placeholder="********" 
                                        required 
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                    />
                                    <span class="flex justify-around items-center" onClick={handleConfirmToggle}>
                                        <Icon class="absolute mr-10" icon={confirmPasswordIcon} size={20}/>
                                    </span>
                                </div>          
                        </Form.Group>
                        <div className="mb-3 d-grid">
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