/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/Navbar";
import Footer from "../Footer";
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import axios from "axios";
import api_endpoint from "../../../config";

const RedeemKey = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmitHandler = (data) => {
    setLoading(true);
    console.log(data)

    axios
      .post(api_endpoint + "/verify-key", data)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setTimeout(() => {
            // setLoading(false); // Set loading to false when the operation is complete
            navigate("/signup");
            // window.location.reload();
          }, 2000);
        }
        if(response.status === 401){
          console.log('Error')
        }
      })
      .catch((error) => {
        console.error("Error", error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
     if (token) {
      if (role == 2) navigate('/dashboard')
      if (role == 1) navigate('/superadmin/manageusers')
    }
    document.title = "Redeem Special Key";
  }, []);


  return (
    <>
      <Navbar />
      <div className="mt-20 md:bg-bgLogin md:bg-cover min-h-screen bg-CoffeeBeans bg-cover">
        <section className="justify-center md:mx-24 lg:mx-32 xl:mx-48 items-center">
          <form
            // onSubmit={handleSubmit(onSubmitHandler)}
            className="rounded-[40px] p-8 max-w-xs w-full"
          >
            <div className="w-[145%] justify-center poppins-font">
              <h1 className="text-center text-white font-bold text-[30px] md:mt-24 md:mb-3 mt-20 mb-2 poppins-font">
                Redeem Activation Key
              </h1>
              <p className="mb-5 text-textDesc">You can register your account if you have activation key that you received from your email.</p>
              {/* <label className="block text-white mb-2" htmlFor="email">
                Full Name
              </label> */}
              <input
                name="keyInput"
                type="text"
                placeholder="Activation Key"
                {...register("keyInput", {
                  required: "Key is required",
                })}
                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${
                  errors.keyInput ? "mb-2" : "mb-5"
                }`}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i,
                    message: "Invalid email address",
                  },
                })}
                onChange={(e) => {
                  localStorage.setItem("savedEmail", e.target.value);
                }}
                className={`bg-white w-full rounded-[10px] mt-2 h-10 text-black poppins-font px-4 ${
                  errors.email ? "mb-2" : "mb-5"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 ml-2">{errors.email.message}</p>
              )}
              <button
                type="submit"
                className="btn w-full btn-primary mt-7 text-white"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}
                disabled={loading}
                onClick={handleSubmit(onSubmitHandler)}
              >
                {loading ? "Verifying key..." : "Submit"}
              </button>
              <p className="text-white text-center my-7 ">
                Already have an account?
                <span
                  className="underline cursor-pointer text-yellow-700 poppins-font font-semibold"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  {" "}
                  Sign in
                </span>
              </p>
            </div>
          </form>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};

export default RedeemKey;
