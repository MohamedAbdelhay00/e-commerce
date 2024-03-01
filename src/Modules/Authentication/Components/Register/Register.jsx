import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";

export default function Register() {

  let navg = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
      console.log(req);
      navg('/login')
      setTimeout(() => {
        toast.success('Successfully Registered', {position: "bottom-left"});
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors.msg, {
        position: "bottom-left"
      });
    }
  }

  return (
    <div className="p-4 container">
      <h1>Login</h1>
      <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-3">
              <div className="input-group flex-nowrap">
                {/* <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-regular fa-envelope"></i>
                </span> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Name"
                  aria-label="name"
                  aria-describedby="addon-wrapping"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              <div className="w-100">
                {errors.name && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
      <div className="my-3">
              <div className="input-group flex-nowrap">
                {/* <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-regular fa-envelope"></i>
                </span> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Email"
                  aria-label="email"
                  aria-describedby="addon-wrapping"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Email not valid",
                    },
                  })}
                />
              </div>
              <div className="w-100">
                {errors.email && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-3">
              <div className="input-group flex-nowrap">
                {/* <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-regular fa-envelope"></i>
                </span> */}
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  aria-label="password"
                  aria-describedby="addon-wrapping"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,20}$/,
                      message: "Password not valid",
                    },
                  })}
                />
              </div>
              <div className="w-100">
                {errors.password && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-3">
              <div className="input-group flex-nowrap">
                {/* <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-regular fa-envelope"></i>
                </span> */}
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Your rePassword"
                  aria-label="rePassword"
                  aria-describedby="addon-wrapping"
                  {...register("rePassword", {
                    required: "rePassword is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,20}$/,
                      message: "rePassword not valid",
                    },
                  })}
                />
              </div>
              <div className="w-100">
                {errors.rePassword && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.rePassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-3">
              <div className="input-group flex-nowrap">
                {/* <span className="input-group-text" id="addon-wrapping">
                  <i className="fa-regular fa-envelope"></i>
                </span> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your phone"
                  aria-label="phone"
                  aria-describedby="addon-wrapping"
                  {...register("phone", {
                    required: "phone is required",
                    pattern: {
                      value: /^(010|011|012|015)\d{8}$/, 
                      message: "phone not valid",
                    }
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
            <div className="mt-4 d-flex justify-content-end">
              <button disabled={isSubmitting} className="btn btn-success">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Register'
        )}
              </button>
            </div>
      </form>
    </div>
  );
}

