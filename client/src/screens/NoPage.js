import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="mx-auto w-[70%] text-center h-full">
            <p className="error font-medium mt-20">404: Page Not Found </p>
            <div className=" text-lg font-medium mt-4 leading-10">
                I also wish I saw more sneakers here too ;( Come, let's check <Link className="border-none text-base px-2 py-2 rounded bg-red-600 text-gray-100" to="/">Home</Link> page again.
            </div>
        </div>
    )
}


export default ErrorPage;