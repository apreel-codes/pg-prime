import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import './Footer.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getError } from "../../uttils";
import { toast } from "react-toastify";



const Footer = () => {
  const [email, setEmail] = useState('');

 

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!email){
      toast.error("Kindly provide an email address");
      return;
    }
    try {
      await axios.post('/subscribe', {
        email
      });
      toast.success('You have successfully subscribed to our newsletter.');
    } catch (err) {
      toast.error(getError(err));
    }
    setEmail('');
  }



  console.log(window.location.host);
  return (
    <footer className="md:px-12 md:py-14 p-8">
    <div className="flex flex-col gap-y-12 justify-between md:flex-row md:items-center">
      <div className="footer-form">
          <div className="">
              <h1 className="font-bold">Let's keep in touch</h1>
                      <p>Be the first to know when we start sales and have new arrivals.</p>
          </div>
          <Form className="flex flex-col md:flex-row justify-between md:items-center" onSubmit={submitHandler}>
              <Form.Group className="" controlId="email">
                <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
              <div className="">
                  <Button className="button py-2 border-none text-white" type="submit">SUBSCRIBE NOW</Button>
              </div>
          </Form>
      </div>

        <div className="link-contact flex flex-col md:gap-x-32 gap-y-12 md:flex-row justify-between">
          {/* quick links */}
            <div className="flex flex-col gap-y-3">
              <span className="font-semibold text-base">Quick Links</span>
                <ul className="flex flex-col gap-y-2">
                  <li><Link to='#'>Best Sellers</Link></li>
                  <li><Link to='#'>Discount Sales</Link></li>
                  <li><Link to='#'>New Arrivals</Link></li>
                  <li><Link to='#'>Gallery</Link></li>
                  <li><Link to='/refundpolicy'>Refund Policy</Link></li>
                </ul>
              </div>

              {/* about us */}
              <div className="flex flex-col gap-y-3">
                <div className="">
                  <span className="font-semibold text-base">Payments Method</span>
                  <p className="payment-text mt-6 mb-2">We accept payment all across the world through PayPal</p>
                </div>
                <span className="font-semibold text-base ">Contacts</span>
                <ul className="flex flex-col gap-y-2">
                  {/* <li>Contact</li> */}
                  <li>
                    <div className="flex flex-flow gap-x-5">
                      <Link
                      ><img className="socials-twitter"  src="../images/twitter.png"/></Link>
                      <Link to="https://www.facebook.com/profile.php?id=61551700054426&mibextid=LQQJ4d"
                      ><img className="socials-facebook"  src="../images/facebook.png"/></Link>
                      <Link 
                      to="https://instagram.com/pgf_prime?igshid=MzRIODBiNWFIZA=="
                      ><img className="socials-instagram"  src="../images/instagram.png"/></Link>
                      
                    </div>
                  </li>
                </ul>
            </div>
        </div>
        
    </div>
    </footer>
  );
};

export default Footer;
