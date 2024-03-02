import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let token = localStorage.getItem("userToken");

  let navigvate = useNavigate();

  let { addToCart, addToWishList, setNumOfCartItems } = useContext(CartContext);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      // console.log(res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWishList = async (id, event) => {
    event.stopPropagation();
    try {
      let req = await addToWishList(id);
      console.log(req);
      event.target.classList.replace("fa-regular", "fa-solid");
      event.target.classList.replace("text-black", "text-danger");
      setTimeout(() => {
        toast.success(req.data.message, { position: "bottom-left" });
      }, 100);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { position: "bottom-left" });
    }
  };

  const addCart = async (id, event) => {
    event.stopPropagation();
    try {
      let req = await addToCart(id);
      console.log(req);
      if (req && req.data) {
        setNumOfCartItems(req.data.numOfCartItems);
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

  const getSpicialProduct = (id) => {
    navigvate(`product/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container p-5">
        <ToastContainer></ToastContainer>
        <div className="search-field w-100 d-flex justify-content-center my-5">
          <input
            type="text"
            placeholder="Search by product title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control w-75"
          />
        </div>

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div
              className="col-md-3"
              onClick={() => {
                getSpicialProduct(product.id);
              }}
              key={product.id}
            >
              <div className="product-card rounded p-3 position-relative">
                <div className="d-flex justify-content-end">
                  <i
                    onClick={(event) => {
                      addWishList(product.id, event)
                    }}
                    className="fa-regular fa-heart text-black z-3"
                  ></i>
                </div>
                <img
                  src={product.imageCover}
                  alt="productImg"
                  className="productImg w-100 p-3"
                />
                <div className="d-flex justify-content-between">
                  <div>
                    <p>{product.subcategory[0].name}</p>
                    <h6>{product.title.split(" ").slice(0, 2).join(" ")}</h6>
                    <p>{product.price} EGP</p>
                  </div>
                  <div className="reviews">
                    <i className="fa-solid fa-star">{product.ratingsAverage}</i>
                  </div>
                </div>
                <div className="d-flex justify-content-center w-100 ">
                  <button
                    onClick={(event) => {
                      addCart(product.id, event);
                    }}
                    className="btn btn-success w-100"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
