// import Container from "./Container";
import Ruler from "./Ruler";

import Container from 'react-bootstrap/Container';

const Footer = () => {
  console.log(window.location.host);
  return (
    <footer className="mt-auto bg-black text-gray-400">
      <Container className="flex flex-col gap-y-12 justify-between pt-4 md:flex-row">
        {/* quick links */}
        <div className="flex flex-col gap-y-6">
          <span className="font-semibold text-lg">Quick Links</span>
          <ul className="flex flex-col gap-y-2">
            <li>Home</li>
            <li>Shop</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* about us */}
        <div className="flex flex-col gap-y-6">
          <span className="font-semibold text-lg ">About Us</span>
          <ul className="flex flex-col gap-y-2">
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* payment methods */}
        <div className="flex flex-col gap-y-6">
          <span className="font-semibold text-lg">
            Supported payment methods
          </span>
          <ul className="grid grid-cols-4 gap-3 max-w-[15rem]">
            <li>
              <img src="/images/visa.svg" alt="" className="max-w-[2.8rem]" />
            </li>
            <li>
              <img
                src="/images/mastercard.svg"
                alt=""
                className="max-w-[3.5rem]"
              />
            </li>
            <li>
              <img src="/images/verve.svg" alt="" className="max-w-[2.8rem]" />
            </li>
            <li>
              <img
                src="/images/paystack.svg"
                alt=""
                className="max-w-[2.8rem]"
              />
            </li>
            <li>
              <img src="/images/zenith.svg" alt="" className="max-w-[2.8rem]" />
            </li>
            <li>
              <img src="/images/access.svg" alt="" className="max-w-[2.8rem]" />
            </li>

            <li>
              <img src="/images/gtb.svg" alt="" className="max-w-[2.8rem]" />
            </li>
          </ul>
        </div>
      </Container>

      <Ruler className="my-12"></Ruler>

      <Container className="container">
        <div className="flex flex-col gap-y-2 mb-10">
          <span className="text-xs">Country/region</span>
          <span className="border-2 border-gray max-w-[10rem] py-2 flex items-center justify-center">
            NGN &#8358; | Nigeria
          </span>
        </div>
        <small className="text-xs">
          &copy; 2023, PGF Prime &#183; Refund policy &#183; Privacy policy
          &#183; Terms of service &#183; Contact information
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
