/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../../assets/beansLogo.png";
import Navbar from "../../component/Navbar";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [checkboxStatus, setCheckboxStatus] = useState(false);

  //---onSubmit form Handler----
  //---kanang console.log eh change rana para eh connect sa database
  const onSubmitHandler = (data) => {
    console.log(data);
    console.log("checkboxStatus:", checkboxStatus);
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 bg-CoffeeBeans bg-cover h-[100vh] w-full">
        <section
          className="flex flex-cols w-full  
        justify-center items-center"
        >
          <img
            src={BeansLogo}
            alt="BeansLogo"
            className="h-22 w-22 mx-auto 
            "
          />
        </section>

        <section
          className="flex flex-cols w-full 
        justify-center items-center"
        >
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="bg-bgopacity rounded-[30px] w-[440px]"
          >
            <div className="w-[85%] mx-auto">
              <h1 className="text-center font-bold text-[21px] mt-10 mb-14">
                Login your account
              </h1>
              <input
                name="email"
                type="email"
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`bg-[#512615] w-full rounded-[20px] h-10 text-white px-4 ${
                  errors.email ? "mb-2" : "mb-5"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 ml-2">{errors.email.message}</p>
              )}
              <input
                name="password"
                type="password"
                placeholder="Enter your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`bg-[#512615] w-full rounded-[20px] h-10 text-white px-4 ${
                  errors.password ? "mb-2" : "mb-5"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 ml-2">{errors.password.message}</p>
              )}

              <div className=" flex justify-between mx-auto mb-5 w-[95%]">
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="checkbox h-5 w-5 rounded-[5px] border-black border-2"
                    checked={checkboxStatus}
                    onChange={(e) => setCheckboxStatus(e.target.checked)}
                  />
                  <span className="ml-2 pt-1">Stay signed In</span>
                </div>
                <p className="hover:underline cursor-pointer pt-1 ">
                  Forgot password?
                </p>
              </div>
              <button
                type="submit"
                className="btn w-full btn-primary mt-7 text-white"
              >
                login
              </button>
              <p className="text-center my-7">
                Don't have and account?
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  {" "}
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
