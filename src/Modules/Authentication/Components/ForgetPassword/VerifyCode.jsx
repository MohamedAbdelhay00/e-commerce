import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
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
      let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data);
      console.log(req);
      navg('/reset-password')
      setTimeout(() => {
        toast.success('Your Verification code has been successfully verified', {position: "bottom-left"});
      }, 500);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-left"
      });
    }
  }

  return (
    <div className="p-4 container">
      <h1>please enter your email to get verification code</h1>
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
                  placeholder="Enter Your Code"
                  aria-label="resetCode"
                  aria-describedby="addon-wrapping"
                  {...register("resetCode", {
                    required: "ResetCode is required",
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
            <div className="mt-4 d-flex justify-content-end">
              <button disabled={isSubmitting} className="btn btn-success">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Verify Code'
        )}
              </button>
            </div>
      </form>
    </div>
  );
}

