import React from "react";
import './RefundPolicy.css'
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";


const RefundPolicy = () => {
    return (
        <div className="refund-page">
            <Header />
            <div className="refund w-[85%] md:w-[80%] mx-auto my-8">
                <h1 className="text-center">Refund Policy</h1>
                <div className="mt-5">
                    <p>At PGF Prime, your satisfaction is our top priority. 
                        We understand that shopping for sneakers online may come with uncertainties, so we've crafted a comprehensive refund policy to make your experience as smooth as possible. 
                        Please read through the following sections to understand our policies for different scenarios:</p>
                    <div className="mt-4">
                        <p><strong>1.) Faulty Items: </strong>In the rare event that you receive a faulty or damaged item, we apologize for any inconvenience caused. 
                        Rest assured, we're here to make it right. Please follow these steps:</p>
                        <ul>
                            <li>- Contact our <Link className="underline" to="https://api.whatsapp.com/message/JYVSRELGD47UC1?autoload=1&app_absent=0">customer support team</Link> within 24 hours of receiving the item.</li>
                            <li>- Provide clear images or descriptions of the fault.</li>
                            <li>- We will evaluate the issue promptly and offer a replacement or a full refund, including any associated shipping costs.</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <p><strong>2.) Size Exchanges: </strong>If you find that the size of your sneakers isn't a perfect fit, we're happy to help you exchange it for the right size. 
                                        Here's what you need to know:</p>
                        <ul>
                            <li>- Size exchanges are eligible within 7 days of receiving your order.</li>
                            <li>- The sneakers must be unworn, in their original condition, and with all packaging.</li>
                            <li>- Contact our <Link className="underline" to="https://api.whatsapp.com/message/JYVSRELGD47UC1?autoload=1&app_absent=0">support team</Link> to initiate the exchange process.</li>
                            <li>- Once we receive the item, we'll send you the correct size, and you may be responsible for any shipping costs.</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <p><strong>3.) Change of Mind: </strong>No refund is offered for change of mind after you have ordered, you can change size if needed.</p>
                    </div>
                    <div className="mt-4">
                        <p><strong>4.) Refund: </strong>In the event where the item you ordered is sold out, customers will be notified and offered a refund or an alternative product.  
                                        We strive to process refunds and exchanges swiftly, ensuring a hassle-free experience for our valued customers. 
                                        Please note that the timeline for refunds may vary depending on your payment method and financial institution.</p>
                    </div>
                    <p className="mt-4">If you have any questions or need further assistance, please don't hesitate to contact our dedicated <Link className="underline" to="https://api.whatsapp.com/message/JYVSRELGD47UC1?autoload=1&app_absent=0">customer support team</Link>. 
                        Your satisfaction is our commitment, and we're here to make your shopping experience with PGF Prime exceptional. 
                        Thank you for choosing us for your sneaker needs!</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RefundPolicy;