import { createContext, useState } from "react";
import axios from "axios";

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  let token = localStorage.getItem("userToken");

  let [noOfCartItems, setNoOfCartItems] = useState(0);

  const [numOfCartItems, setNumOfCartItems] = useState(0);

  const getCartItems = async () => {
    try {
      let response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle empty cart here
        return { data: { products: [] } };
      } else {
        throw error;
      }
    }
  };

  const getNoOfCartItems = async () => {
    try {
      let response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: token,
        },
      });
      if (response.data && response.data.products) {
        setNoOfCartItems(response.data.products.length);
      } else {
        setNoOfCartItems(0);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNoOfCartItems(0);
      } else if (error.response) {
        throw error;
      }
    }
  };

  const addToCart = (id) => {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      {
        headers: {
          token: token,
        },
      }
    );
  };

  const removeCart = (id) => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: token,
      },
    });
  };

  const updateCart = (id, count) => {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count },
      {
        headers: {
          token: token,
        },
      }
    );
  };

  const removeAllCartItems = () => {
      return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: token,
          },
        }
      );
  };

  const addToWishList = (id) => {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      {
        headers: {
          token: token,
        },
      }
    );
  };

  const checkoutPayment = (id, data) => {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {shippingAddress: data}, {
      headers: {
        token: token,
      },
    })
  }

  return (
    <CartContext.Provider
      value={{ addToCart, addToWishList, getCartItems, updateCart, removeCart, removeAllCartItems, getNoOfCartItems, noOfCartItems, checkoutPayment, setNumOfCartItems, numOfCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
