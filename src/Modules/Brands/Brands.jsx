import React, { useState, useEffect } from "react";
import axios from "axios";
import './Brands.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GetSingleBrand from "./GetSingleBrand";

export default function Categories() {
  const [brands, setBrands] = useState([]);

  let [id, setId] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getBrands = async () => {
    try {
      let req = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      // console.log(req.data.data);
      setBrands(req.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container p-5">
    <h1 className=" text-success text-center pb-5">All Brands</h1>
      <div className="row g-4">
        {brands.map((brand) => (
          <div className="col-md-3" key={brand._id} onClick={()=> {handleShow(); setId(brand._id)}}>
            <div className="brand-card text-center">
              <img src={brand.image} alt="categoryImg" className="w-100" />
              <p className="bg-white py-3">{brand.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <GetSingleBrand id={id}/> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
    
  );
}
