import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import './NoPage.css';


const ErrorPage = () => {
    return (
        <div>
           <Header />
           <div className="mobile-error md:hidden block mx-auto w-[70%] text-center">
            <img className="mobile-error-image" src='../images/page.png'/>
            <div className="mobile-error-text">
               <h1 className="">Page not found... </h1>
               <p className="">
                  We are unable to find the page you are looking for.
               </p>
               <div className="d-grid">
                <button className="mobile-error-button">
                    <Link to="/">Back to homepage</Link>
                </button>
               </div>
            </div>
           </div>
           <div className="web-error md:block hidden md:flex md:flex-row md:justify-between md:mx-auto md:w-[90%] md:items-center">
            <div className="web-error-text w-[40%] text-left">
                    <h1 className="web-error-image">Page not found... </h1>
                    <p className="">
                        We are unable to find the page you are looking for.
                    </p>
                    <div className="d-grid">
                        <button className="web-error-button">
                            <Link to="/">Back to homepage</Link>
                        </button>
                    </div>
            </div>
            <img className="web-error-image" src='../images/page.png'/>
           </div>
        </div>
    )
}


export default ErrorPage;