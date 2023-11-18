/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../../component/Navbar";
import ForgotPasswordModal from "../../../component/ForgotPasswordModal";
import Footer from "../Footer";

import { loginUser } from "../../../../redux/authActions";
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [disabledError, setDisabledError] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.auth)
  const role = useSelector(state => state.auth.role);

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
    // if(rememberMe == true){
    //   localStorage.setItem("savedEmail", savedEmail);
    //   localStorage.setItem("savedPassword", savedPassword);
    //   setSavedEmail(savedEmail);
    //   setSavedPassword(savedPassword);
    // }
  }, []);

  // const onSubmitHandler = (data) => {
  //   setLoading(true); // Set loading state to true when form is submitted
  //   axios
  //     .post(api_endpoint + "/login", data)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const token = response.data.token;
  //         const user_id = response.data.user.id;
  //         const role = response.data.user.role;
  //         localStorage.setItem("role", role);
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("user_id", user_id);
  //         console.log(role, user_id);
  //         if (role == 2) {
  //           setTimeout(() => {
  //             setLoading(false); // Set loading to false when the operation is complete
  //             navigate("/dashboard");
  //             // window.location.reload();
  //           }, 2000);
  //         }
  //         if (role == 1) {
  //           setTimeout(() => {
  //             setLoading(false); // Set loading to false when the operation is complete
  //             navigate("/superadmin/manageusers");
  //             // window.location.reload();
  //           }, 2000);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error", error.response ? error.response.data : error);
  //       if (error.response && error.response.data.email === 'Email Not Found') {
  //         setEmailError(true);
  //         setPasswordError(false);
  //       }
  //       if (error.response && error.response.data.password === 'Invalid Password') {
  //         setPasswordError(true);
  //         setEmailError(false);
  //       }
  //       if (error.response && error.response.data.disabled === 'User is disabled') {
  //         disableduser();
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false); // Reset loading state
  //     });
  // };

  const onSubmitHandler = (data) => {
    // setLoading(true);

    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        // Registration successful, you can navigate or perform other actions
        if (role == '2') {
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
        if (role == '1') {
          setTimeout(() => {
            navigate("/superadmin/manageusers");
          }, 2000);
        }
        console.log('Login successful');
      })
      .catch((err) => {
        if (err && err.type === 'email') {
          setEmailError(true)
          setPasswordError(false)
        } else if (err && err.type === 'password') {
          setEmailError(false)
          setPasswordError(true)
        } else if (err && err.type === 'disabled') {
          setEmailError(false)
          setPasswordError(false)
          disableduser()
        } else {
        }
      })
      .finally(() => {
        // setLoading(false);
      });      
  }


  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const disableduser = () =>{
    setDisabledError(true);
    setPasswordError(false);
    setEmailError(false);
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
  };

  return (
    <>
      <Navbar />
      <div className="mt-16 md:bg-bgLogin md:bg-cover min-h-screen bg-CoffeeBeans bg-cover">
        <section className="justify-center md:mx-24 lg:mx-32 xl:mx-48 items-center">
          <form
            // onSubmit={handleSubmit(onSubmitHandler)}
            className="rounded-[40px] p-8 max-w-xs w-full"
          >
            <div className="w-[145%] justify-center poppins-font">
              <h1 className="text-center text-white font-bold text-[30px] md:mt-24 md:mb-12 mt-20 mb-12 poppins-font">
                Login
              </h1>
              {/* <label className="block text-white mb-2" htmlFor="email">
                Email Address
              </label> */}
              <input
                name="email"
                type="email"
                placeholder="Email Address"
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
                  setEmailError(false)
                  // localStorage.setItem("savedEmail", e.target.value);
                }}
                className={`bg-white w-full rounded-[10px] poppins-font mt-3 h-10 text-black px-4 ${
                  errors.email ? "mb-2" : "mb-5"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 ml-2">{errors.email.message}</p>
              )}
              {emailError && (
                <p className="text-red-500 ml-2">Email not found. Please double-check and try again.</p>
              )}
              {/* <label className="block text-white mb-2" htmlFor="password">
                Password
              </label> */}
              <input
                name="password"
                type="password"
                placeholder="Password"
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
                  setPasswordError(false)
                    // localStorage.setItem("savedPassword", e.target.value);
                }}
                className={`bg-white w-full rounded-[10px] poppins-font mt-3 h-10 text-black px-4 ${
                  errors.password ? "mb-2" : "mb-5"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 ml-2">{errors.password.message}</p>
              )}
              {passwordError && (
                <p className="text-red-500 ml-2">Incorrect Password. Please double-check and try again.</p>
              )}

              <div className="flex justify-between mx-auto mb-5 w-[95%]">
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="checkbox h-5 w-5 rounded-[5px] border-white border-2"
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                      localStorage.setItem("savedEmail", savedEmail);
                      localStorage.setItem("savedPassword", savedPassword);
                      if (!e.target.checked) {
                        // Clear saved email and password when unchecked
                        // setSavedEmail("");
                        // setSavedPassword("");
                        localStorage.removeItem("savedEmail");
                        localStorage.removeItem("savedPassword");
                      }
                    }}
                  />
                  <span className="poppins-font ml-2 mr-4 pt-1 text-white font-Poppins">
                    Remember me
                  </span>
                </div>
                <p
                  className="poppins-font hover:underline cursor-pointer pt-1 text-white "
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
                className="btn w-full btn-primary mt-7 text-white text-xl font-semibold poppins-font"
                disabled={loading}
                onClick={handleSubmit(onSubmitHandler)}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-  text-white "
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
              {disabledError && (
                <p className="text-red-500 ml-2">User is disabled. Please contact the admin and try again.</p>
              )}
              <p className="text-white poppins-font mt-10 text-center my-7">
                Don't have and account?
                <span
                  className="underline cursor-pointer poppins-font font-semibold text-yellow-800"
                  onClick={() => {
                    navigate("/signup");
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
