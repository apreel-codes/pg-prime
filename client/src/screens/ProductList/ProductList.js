import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { CSVLink } from "react-csv";
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { getError } from '../../uttils';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './ProductList.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductList() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post('/api/products', {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('Product created successfully');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };


  return (
    <div>
      <Header />
      <div className='productlist-page md:w-[80%] w-[90%] my-10 mx-auto'>
          <div className='products-button flex flex-row justify-between items-center mb-4'>
            <h1>
              <h1 className='text-xl font-bold'>Products</h1>
            </h1>
            <div className='export-button flex flex-row justify-between items-center'>
              <div className='csv-button'>
                { products  &&
                <CSVLink data={products}>Export</CSVLink>
                
                }
              </div>
              <div>
                  <Button type="submit" className='productlist-page-button border-none w-full' onClick={() => navigate(`/admin/createproduct`)}>
                    Add new product
                  </Button>
              </div>
            </div>
            
          </div>

          {loadingCreate && <LoadingBox></LoadingBox>}
          {loadingDelete && <LoadingBox></LoadingBox>}

          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
            <table className="table mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td><span className='md:hidden mobile-header block font-semibold'>ID:&nbsp;</span>{product._id}</td>
                      <td><span className='md:hidden mobile-header block font-semibold'>NAME:&nbsp;</span>{product.name}</td>
                      <td><span className='md:hidden mobile-header block font-semibold'>PRICE:&nbsp;</span>&#163;{product.price}</td>
                      <td><span className='md:hidden mobile-header block font-semibold'>CATEGORY:&nbsp;</span>{product.category}</td>
                      <td><span className='md:hidden mobile-header block font-semibold'>BRAND:&nbsp;</span>{product.brand}</td>
                      <td>
                        <Button
                          className='text-blue-800 border-blue-800'
                          type="button"
                          
                          onClick={() => navigate(`/admin/product/${product._id}`)}
                        >
                          Edit
                        </Button>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <Button
                        
                          type="button"
                          className='bg-red-600 text-gray-100 border-none'
                          
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === Number(page) ? 'btn font-bold' : 'btn'}
                    key={x + 1}
                    to={`/admin/productlist?page=${x + 1}`}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
      </div>
      <Footer />
    </div>
);
}