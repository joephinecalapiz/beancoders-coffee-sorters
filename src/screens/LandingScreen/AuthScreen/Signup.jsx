/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import api_endpoint from "../../../config";
import Modal from "../../../component/Modal";
import Footer from "../Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //---kanang console.log eh change rana para eh connect sa database
  const onSubmitHandler = (data) => {
    setLoading(true); // Set loading state to true when form is submitted
    axios
      .post(api_endpoint + "/register/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // setPopupMessage("Done registered your account, you can now login");
          const token = response.data.token;
          const user_id = response.data.user.id;
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);
          setTimeout(() => {
            setLoading(false); // Set loading to false when the operation is complete
            navigate("/company");
          }, 2000); // Simulate a 2-second delay
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          const error = err.response.data.error;
          if (error.email) {
            const emailError = error.email[0];
            setPopupMessage("The email has already been taken");

            // alert(emailError);
          }

          if (error.name) {
            const nameError = error.name[0];
            alert(nameError);
          }
        } else {
          console.error("Error occured", err);
        }
      });
    //console.log(data);
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:bg-bgLogin md:bg-cover bg-CoffeeBeans  h-[100vh] w-full">
        <section className="sm:mx-auto md:mx-24 lg:mx-32 xl:mx-48 items-center">
          <form
            // onSubmit={handleSubmit(onSubmitHandler)}
            className="rounded-[40px] p-8 max-w-xs w-full "
          >
            <div className="w-[120%] mx-auto">
              <h1 className="text-center text-white font-bold text-[40px] md:mt-28 md:mb-12 mt-20 mb-10 poppins-font">
                Create Account
              </h1>
              <label
                className="block text-white mb-2"
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Full name
              </label>
              <input
                name="name"
                type="text"
                placeholder=""
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
              <label
                className="block text-white mb-2"
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
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
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
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
                {loading ? "Processing..." : "Register"}
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
      <Footer></Footer>
      <Modal
        isOpen={popupMessage !== null}
        onClose={() => setPopupMessage(null)}
        showCloseButton={true}
      >
        {popupMessage}
      </Modal>

    </>
  );
};

export default Signup;
