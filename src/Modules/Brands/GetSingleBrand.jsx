import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GetSingleBrand({ id }) {
  const [brand, setBrand] = useState([]);

  const getBrand = async () => {
    try {
      let req = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      // console.log(req.data.data);
      setBrand(req.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className=" container p-2">
      <div className="row">
        <div className="col-md-6">
          <h1 className=" text-success">{brand.name}</h1>
          <p>{brand.name}</p>
        </div>
        <div className="col-md-6">
          <img src={brand.image} alt="brandImg" className="w-100"/>
        </div>
      </div>
    </div>
  );
}
