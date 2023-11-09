/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import api_endpoint from "../../../config";
import Navbar from "../../../component/Navbar";
import ForgotPasswordModal from "../../../component/ForgotPasswordModal";
import Footer from "../Footer";


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [loginError, setLoginError] = useState(false); // Add a state variable for login error
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rememberMe, setRememberMe] = useState(true);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");

  useEffect(() => {
    document.title = "Login";

    // Check for saved email and password in localStorage
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setRememberMe(true);
      setSavedEmail(savedEmail);
      setSavedPassword(savedPassword);
    }
  }, []);

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
          const role = response.data.user.role;
          localStorage.setItem("role", role);
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);
          localStorage.getItem("savedEmail");
          localStorage.getItem("savedPassword");
          console.log(role, user_id);
          if (role == 2){
            setTimeout(() => {
              setLoading(false); // Set loading to false when the operation is complete
              navigate("/dashboard");
              window.location.reload();
            }, 2000);
          }
          if (role == 1){
            setTimeout(() => {
              setLoading(false); // Set loading to false when the operation is complete
              navigate("/superadmin/manageusers");
              window.location.reload();
            }, 2000);
          }
        }
      })
      .catch((error) => {
        console.error("Error", error.response ? error.response.data : error);
        if (error.response && error.response.status === 401) {
          setLoginError(true);
        }
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

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
            // onSubmit={handleSubmit(onSubmitHandler)}
            className="rounded-[40px] p-8 max-w-xs w-full "
          >
            <div className="w-[140%] mx-auto poppins-font">
              <h1 className="text-center text-white font-bold text-[40px] md:mt-28 md:mb-12 mt-20 mb-12 poppins-font">
                Login
              </h1>
              <label
                className="block text-white mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@domain.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                value={savedEmail}
                onChange={(e) => {
                  setSavedEmail(e.target.value);
                  localStorage.setItem("savedEmail", e.target.value);
                }}
                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.email ? "mb-2" : "mb-5"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 ml-2">{errors.email.message}</p>
              )}
              <label
                className="block text-white mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder=""
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                value={savedPassword}
                onChange={(e) => {
                  setSavedPassword(e.target.value);
                  localStorage.setItem("savedPassword", e.target.value);
                }}
                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.password ? "mb-2" : "mb-5"
                  }`}
              />
              {loginError && (
                <p
                  className="text-red-500 ml-2"
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
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                      if (!e.target.checked) {
                        // Clear saved email and password when unchecked
                        // setSavedEmail("");
                        // setSavedPassword("");
                        localStorage.removeItem("savedEmail");
                        localStorage.removeItem("savedPassword");
                      }
                    }}
                  />
                  <span className="ml-2 mr-4 pt-1 text-white font-Poppins">Remember me</span>
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
                disabled={loading}
                onClick={handleSubmit(onSubmitHandler)}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 8.01 0 014 12H0c0 3.042 1.135 5.86 3.169 8.022l2.83-2.73zM12 20a8 8 0 008-8h4a12 12 0 01-12 12v-4zm5.819-10.169A7.96 8.01 0 0120 12h4c0-3.042-1.135-5.86-3.169-8.022l-2.83 2.73z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Loading..." : "Login"}
              </button>
              <p
                className="text-white text-center my-7"
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
      <Footer></Footer>
    </>
  );
};

export default Login;
