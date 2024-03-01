import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../../../imgs/freshcart-logo.svg";

import "./NavbarM.css";
import { CartContext } from "../../../../Context/CartContext";

export default function NavbarM({ userData }) {

  // let [noOfCartItems, setNoOfCartItems] = useState(0);

  let {getCartItems, getNoOfCartItems, noOfCartItems, numOfCartItems} = useContext(CartContext);

  let navg = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    navg("/login");
  }

  const getCart = async () => {
    try {
      const req = await getCartItems();
      console.log(req.data);
      // setNoOfCartItems(req.data.numOfCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
     getCart();
     getNoOfCartItems();
  }, []);

  // useEffect(() => {
  //   // This effect will trigger whenever noOfCartItems changes
  //   getNoOfCartItems();
  // }, [noOfCartItems]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <NavLink className="navbar-brand" href="#">
          <img src={logo} alt="logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex justify-content-center w-100 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="cart">
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="wish-list">
                Wish List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="categories">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="brands">
                Brands
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="cart">
                <div className="cart">
                  <span className="count bg-success">{numOfCartItems}</span>
                  <i className="fa-solid fa-cart-shopping icon"></i>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" onClick={logout}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
