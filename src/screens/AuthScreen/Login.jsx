/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import api_endpoint from "../../config";
import ForgotPasswordModal from "../../component/ForgotPasswordModal";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [loginError, setLoginError] = useState(false); // Add a state variable for login error

  const onSubmitHandler = (data) => {
    setLoading(true); // Set loading state to true when form is submitted

    console.log(data);
    console.log("checkboxStatus:", checkboxStatus);

    axios
      .post(api_endpoint + "/login", data)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          const user_id = response.data.user.id;
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);

          navigate("/dashboard");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error", error.response.data);
        if (error.response.status === 401) {
          setLoginError(true);
        }
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  const [loading, setLoading] = useState(false);

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="md:bg-bgLogin md:bg-cover min-h-screen bg-CoffeeBeans bg-cover">
        <section className="sm:mx-auto md:mx-24 lg:mx-32 xl:mx-48 items-center">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="rounded-[40px] p-8 max-w-xs w-full "
          >
            <div className="w-[120%] mx-auto">
              <h1 className="text-center text-white font-bold text-[40px] md:mt-28 md:mb-12 mt-20 mb-12">
                Login
              </h1>
              <label
                className="block text-white mb-2"
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Enter your Email
              </label>
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
              <label
                className="block text-white mb-2"
                htmlFor="password"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Enter your Password
              </label>
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
              {loginError && (
                <p
                  className="text-red-500 ml-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Invalid email or password.
                </p>
              )}

              {/* {errors.password && (
                <p className="text-red-500 ml-2">{errors.password.message}</p>
              )} */}

              <div className="flex justify-between mx-auto mb-5 w-[95%]">
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="checkbox h-5 w-5 rounded-[5px] border-white border-2"
                    checked={checkboxStatus}
                    onChange={(e) => setCheckboxStatus(e.target.checked)}
                  />
                  <span className="ml-2 mr-4 pt-1 text-white font-Poppins">
                    Remember me
                  </span>
                </div>
                <p
                  className="hover:underline cursor-pointer pt-1 text-white font-Poppins"
                  onClick={openForgotPasswordModal}
                >
                  Forgot password?
                </p>
                <ForgotPasswordModal
                  isOpen={showForgotPasswordModal}
                  onClose={closeForgotPasswordModal}
                />
              </div>

              <button
                type="submit"
                className="btn w-full btn-primary mt-7 text-white"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <p
                className="text-center my-7"
                style={{ color: "white", fontFamily: "Poppins, sans-serif" }}
              >
                Don't have and account?
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  style={{
                    color: "#512615",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {" "}
                  Create an Account
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
