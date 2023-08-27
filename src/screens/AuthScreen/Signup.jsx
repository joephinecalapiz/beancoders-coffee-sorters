/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../../assets/beansLogo.png";
import Navbar from "../../component/Navbar";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //---kanang console.log eh change rana para eh connect sa database
  const onSubmitHandler = (data) => {
    console.log(data);
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 bg-bgLogin bg-cover h-[100vh] w-full">
        <section className="flex flex-cols w-full justify-center items-center mt-5">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="rounded-[30px] w-[440px]"
          >
            <div className="w-[85%] mx-auto">
              <h1
                className="text-center font-bold text-[30px] mt-8 mb-5"
                style={{ color: "white", fontFamily: "Poppins, sans-serif" }}
              >
                Create Account
              </h1>
              <input
                name="name"
                type="text"
                placeholder="Enter your Name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z ]{2,30}$/,
                    message: "Invalid Name",
                  },
                })}
                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${
                  errors.name ? "mb-2" : "mb-5"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              />

              {errors.name && (
                <p className="text-red-500 ml-2">{errors.name.message}</p>
              )}

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
                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${
                  errors.email ? "mb-2" : "mb-5"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
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
                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${
                  errors.password ? "mb-2" : "mb-5"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.password && (
                <p className="text-red-500 ml-2">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="btn w-full btn-primary mt-7 text-white"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}
              >
                REGISTER
              </button>
              <p
                className="text-center my-7"
                style={{
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Already have an account?
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{
                    color: "#512615",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
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
    </>
  );
};

export default Signup;
