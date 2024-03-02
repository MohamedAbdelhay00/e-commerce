import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";

export default function Product() {
  let { id } = useParams();

  const [product, setProduct] = useState({});

  let {addToCart, addToWishList, setNumOfCartItems} = useContext(CartContext);

  const getProduct = async () => {
    try {
      let req = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(req.data.data);
      setProduct(req.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = async (id, event) => {
    event.stopPropagation();
    try {
      let req = await addToCart(id);
      console.log(req);
      if (req && req.data) {
        if (typeof setNumOfCartItems === 'function') {
          setNumOfCartItems(req.data.numOfCartItems);
        } else {
          console.log('setNumOfCartItems is not a function');
        }
        setTimeout(() => {
          toast.success(req.data.message, { position: "bottom-left" });
        }, 100);
      } else {
        console.log('No data in response');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { position: "bottom-left" });
      }
    }
  };
  
  const addWishList = async (id, event) => {
    event.stopPropagation();
    try {
      let req = await addToWishList(id);
      console.log(req);
      if (req && req.data) {
        event.target.classList.replace("fa-regular", "fa-solid");
        event.target.classList.replace("text-black", "text-danger");
        setTimeout(() => {
          toast.success(req.data.message, { position: "bottom-left" });
        }, 100);
      } else {
        console.log('No data in response');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { position: "bottom-left" });
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="product container py-5">
      <div className="row gy-3 justify-content-center align-items-center w-100">
        <div className="col-md-4">
        <ToastContainer></ToastContainer>
          <Carousel
            data-bs-theme="dark"
            indicators={false}
            prevIcon={<i className="fa-solid fa-arrow-left text-danger"></i>}
            nextIcon={<i className="fa-solid fa-arrow-right text-success"></i>}
          >
            {product.images &&
              product.images.map((img) => (
                <Carousel.Item key={img}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt="Product Image"
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
        <div className="col-md-8">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div className="d-flex justify-content-between ">
            <span>{product.price}EGP</span>
            <span className="reviews">
              <i className="fa-solid fa-star"> {product.ratingsAverage}</i>
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-5">
            <button onClick={(event)=> {addCart(product.id, event)}} className=" btn btn-success mx-auto w-75">+ Add</button>
            <i onClick={(event) => {addWishList(product.id, event)}} className="fa-regular fa-heart text-black z-3"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
