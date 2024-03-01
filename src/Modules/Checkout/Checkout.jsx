import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import axios from "axios";

export default function Checkout() {

    let data = useParams();
    console.log(data);

    let {checkoutPayment} = useContext(CartContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();

      const onSubmit = async (val) => {
        try {
          let req = await checkoutPayment(data.id, val);
          console.log(req);
          window.open(req.data.session.url, "_self");
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div className=' container w-75'>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-3">
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Details"
                  aria-label="details"
                  aria-describedby="addon-wrapping"
                  {...register("details", {
                    required: "Details is required",
                    pattern: {
                      value: /^[\w]{3,}$/,
                      message: "details not valid",
                    },
                  })}
                />
              </div>
              <div className="w-100">
                {errors.details && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.details.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-3">
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="phone"
                  aria-label="phone"
                  aria-describedby="addon-wrapping"
                  {...register("phone", {
                    required: "phone is required",
                    pattern: {
                      value: /^(010|011|012|015)\d{8}$/,
                      message: "phone not valid",
                    },
                  })}
                />
              </div>
              <div className="w-100">
                {errors.phone && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-3">
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="city"
                  aria-label="city"
                  aria-describedby="addon-wrapping"
                  {...register("city", {
                    required: "city is required",
                    pattern: {
                      value: /^[\w]{3,}$/,
                      message: "city not valid",
                    },
                  })}
                />
              </div>
              <div className="w-100">
                {errors.city && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-between">
              <button disabled={isSubmitting} className="btn btn-success w-100">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Pay'
        )}
              </button>
            </div>
      </form>
    </div>
  )
}
