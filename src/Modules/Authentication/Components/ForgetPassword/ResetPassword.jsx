import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";

export default function VerifyCode() {

  let navg = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let req = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data);
      console.log(req);
      navg('/login')
      setTimeout(() => {
        toast.success('Your password has been successfully reset', {position: "bottom-left"});
      }, 500);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-left"
      });
    }
  }

  return (
    <div className="p-4 container">
      <h1>Reset your account password</h1>
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
                  placeholder="Enter Your New Password"
                  aria-label="newPassword"
                  aria-describedby="addon-wrapping"
                  {...register("newPassword", {
                    required: "newPassword is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,20}$/,
                      message: "newPassword not valid",
                    },
                  })}
                />
              </div>
              <div className="w-100">
                {errors.newPassword && (
                  <span className="alert alert-danger w-100 d-flex">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-between">
            <Link className=" text-decoration-none text-success" to="/forget-password">Forgot Your Password?</Link>
              <button disabled={isSubmitting} className="btn btn-success">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Login'
        )}
              </button>
            </div>
      </form>
    </div>
  );
}

