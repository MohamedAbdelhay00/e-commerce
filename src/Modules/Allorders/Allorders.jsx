import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function Allorders() {
  let [allorders, setAllorders] = useState([]);

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

  const getAllorders = async () => {
    try {
      let req = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/65c93ff65f7676d5e806b29b`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(req.data);
      setAllorders(req.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // const removeWish = async (id) => {
  //   try {
  //     let req = await axios.delete(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
  //       headers: {
  //         token: token,
  //       }
  //     })
  //     setWishList(wishList.filter(wish => wish.id !== id));
  //     getWishList();
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };

  useEffect(() => {
    getAllorders();
  }, []);

  return (
    <div className="wish-list container">
      <div className="inner-wish-list p-5 m-5 bg-body-tertiary rounded">
        <h2 className="pb-4">Allorders</h2>
        {allorders.map((order) => (
          <div key={order.id}>
          <div className="row">
          <h6>Total order Price: {order.totalOrderPrice}</h6>
            {order.cartItems && order.cartItems.map((item) => (
              <div className="col-md-2">
                  <img src={item.product.imageCover} alt="" className="w-100"/>
                  </div>
            ))}
            </div>
            <div><img src="" alt="" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
