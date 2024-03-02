import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  let [categoryName, setCategoryName] = useState([])

  const getCategories = async () => {
    try {
      let req = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      // console.log(req.data.data);
      setCategories(req.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategories = async (id) => {
    try {
      let req = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`
      );
      // console.log(req.data.data);
      setSubCategories(req.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="container p-5">
      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-md-4" onClick={()=> {getSubCategories(category._id); setCategoryName(category.name); }} key={category._id}>
            <div className="category-card text-center">
              <img src={category.image} alt="categoryImg" className="w-100" />
              <h4 className="bg-white text-success py-3">{category.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="container p-5">
    <h1 className=" text-success text-center pb-5">{categoryName} subcategories</h1>
      <div className="row g-4">
        {subCategories.map((subCategory) => (
          <div className="col-md-4" key={subCategory._id}>
            <div className="category-card text-center">
              <h4 className="bg-white rounded-5 py-3">{subCategory.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
