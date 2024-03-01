import React, { useState, useEffect, useContext } from "react";

import "./WishList.css";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function WishList() {
  let [wishList, setWishList] = useState([]);

  const [loaded, setLoaded] = useState(false);

  let token = localStorage.getItem("userToken");

  let {addToCart, setNumOfCartItems} = useContext(CartContext);

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

  const getWishList = async () => {
    try {
      let req = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(req.data.data);
      setWishList(req.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const removeWish = async (id) => {
    try {
      let req = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: token,
        }
      })
      setWishList(wishList.filter(wish => wish.id !== id));
      getWishList();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <div className="wish-list container">
      <div className="inner-wish-list p-5 m-5 bg-body-tertiary rounded">
        <h2 className="pb-4">My wish List</h2>
        {wishList.map((wish) => (
          <div className="row mb-5 pb-5 bordStyle" key={wish.id}>
            <div className="col-md-2">
              <img src={wish.imageCover} alt={wish.title} className="w-100" />
            </div>
            <div className="col-md-10 d-flex justify-content-between align-items-center">
              <div className="w-75">
                <h5>{wish.title}</h5>
                <h6 className=" text-success">{wish.price} EGP</h6>
                <button onClick={()=> {removeWish(wish.id)}} className="btn text-danger p-0">
                  <i className="fa-solid fa-trash"></i> Remove
                </button>
              </div>
              <div>
                <button onClick={(event) => {addCart(wish.id, event)}} className="btn btn-outline-success">
                  + Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
