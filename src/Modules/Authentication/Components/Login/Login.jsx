import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";

export default function Login() {

  let { setToken } = useContext(UserContext)

  let navg = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
      console.log(req);
      localStorage.setItem("userToken", req.data.token)
      setToken(req.data.token)
      navg('/home')
      setTimeout(() => {
        toast.success("login success", { position: "bottom-left" });
      }, 100);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right"
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

