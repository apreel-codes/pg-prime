import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../uttils';
import { Store } from '../../Store';
import Row from "react-bootstrap/Row";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Col from "react-bootstrap/Col";
import './ResetPassword.css';
import Testimonials from '../../components/Testimonials/Testimonials';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';



export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

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


  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo || !token) {
      navigate('/');
    }
  }, [navigate, userInfo, token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axios.post('/api/users/reset-password', {
        password,
        token,
      });
      navigate('/signin');
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className='sign-in mx-auto'>
      <Helmet>
        <title>Reset Password</title>
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
                        <h1 className="mb-1 font-bold">Set up a new password</h1>
                        <p>Your new password should be different from any of your previous passwords.</p>
                    </div>
                    <Form className="main-form" onSubmit={submitHandler}>
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

                        <div className="mb-3 mt-4 d-grid">
                            <Button className="button py-2 border-none text-white" type="submit">Reset Password</Button>
                        </div>
                    </Form>
                </div>
            </Col>
      </Row>
    </div>
  );
}
