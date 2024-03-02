import React, { useState, useEffect, useContext } from "react";

import "./Cart.css";
import { toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let [cart, setCart] = useState([]);
  let [cartDetails, setCartDetails] = useState([]);
  let [noOfItems, setNoOfItems] = useState([{}]);

  let {
    getCartItems,
    updateCart,
    removeCart,
    removeAllCartItems,
    setNumOfCartItems,
  } = useContext(CartContext);

  let token = localStorage.getItem("userToken");
  
  const getCart = async () => {
    try {
      let req = await getCartItems();
      // console.log(req?.data?.data);
      setNoOfItems(req?.data);
      setCartDetails(req?.data?.data);
      setCart(req?.data?.data?.products);

      // Call setNumOfCartItems with the number of items in the cart
      setNumOfCartItems(req?.data?.data?.products?.length);
    } catch (error) {
      console.log(error);
      if (error.response.data.statusMsg == "fail") {
        setCart(null);
      }
    }
  };

  const removeCartF = async (id) => {
    try {
      let req = await removeCart(id);
      console.log(req);
      setCart(cart.filter((item) => item?._id !== id));
      getCart();
      setTimeout(() => {
        toast.success(req?.data?.message, { position: "bottom-left" });
      }, 100);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message, { position: "bottom-left" });
    }
  };

  const updateCartF = async (id, count) => {
    try {
      let req = await updateCart(id, count);
      console.log(req);
      getCart();
      setTimeout(() => {
        toast.success(req.data.message, { position: "bottom-left" });
      }, 100);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, { position: "bottom-left" });
    }
  };

  const increaseCount = (id, count) => {
    updateCartF(id, count + 1);
  };

  const decreaseCount = (id, count) => {
    if (count > 1) {
      updateCartF(id, count - 1);
    } else {
      removeCartF(id);
    }
  };

  const removeAllCartItemsF = async () => {
    try {
      let req = await removeAllCartItems();
      if (req.status === 200) {
        setCart(null);
        setNumOfCartItems(0);
      }
      console.log(req);
      setTimeout(() => {
        toast.success(req.data.message, { position: "bottom-left" });
      }, 100);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, { position: "bottom-left" });
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="wish-list container">
      {cart?.length === 0 ? (
        <div className="inner-wish-list p-5 m-5 bg-body-tertiary rounded">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="pb-4">Cart Shop</h2>
              <h5>Your Cart is Empty</h5>
            </div>
          </div>
        </div>
      ) : (
        <div className="inner-wish-list p-5 m-5 bg-body-tertiary rounded">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="pb-4">Cart Shop</h2>
              <h5>
                total price:{" "}
                <span className="text-success">
                  {cartDetails && cartDetails.totalCartPrice}
                </span>
              </h5>
            </div>
            <div className="d-flex flex-column align-items-end">
              <Link
                to={`/home/checkout/${cartDetails?._id}`}
                className="btn btn-primary fs-5 mb-4"
              >
                Checkout
              </Link>
              <h5>
                total number of items:{" "}
                <span className="text-success">
                  {noOfItems?.numOfCartItems}
                </span>
              </h5>
            </div>
          </div>
          {cart?.map((cart) => (
            <div className="row gy-3 mb-5 pb-5 bordStyle" key={cart?._id}>
              <div className="col-md-2">
                <img
                  src={cart?.product.imageCover}
                  alt={cart?.title}
                  className="w-100"
                />
              </div>
              <div className="col-md-10 d-flex justify-content-between align-items-center">
                <div className="w-75">
                  <h5>{cart?.product.title}</h5>
                  <h6 className=" text-success">{cart?.price} EGP</h6>
                  <button
                    onClick={() => {
                      removeCartF(cart?.product._id);
                    }}
                    className="btn text-danger p-0"
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    onClick={() => {
                      increaseCount(cart?.product._id, cart?.count);
                    }}
                    className="btn btn-outline-success"
                  >
                    +
                  </button>
                  <span className="px-3">{cart?.count}</span>
                  <button
                    onClick={() => {
                      decreaseCount(cart?.product._id, cart?.count);
                    }}
                    className="btn btn-outline-danger"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button onClick={removeAllCartItemsF} className="btn btn-outline-success">Clear cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
