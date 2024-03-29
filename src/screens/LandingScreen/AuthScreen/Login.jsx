/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../../component/Navbar";
import ForgotPasswordModal from "../../../component/ForgotPasswordModal";
import Footer from "../Footer";
import Cookies from 'js-cookie'
import { loginUser } from "../../../../redux/services/auth/authActions";
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from "../../../../redux/services/api/authService";
import localhost_domain from "../../../cookie";

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
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);

  useEffect(() => {
    if (token === null) {
      navigate("/login")
    }
    else{
      if (role == 2) navigate('/dashboard')
      if (role == 1) navigate('/superadmin/manageusers')
    }
  }, []);

  useEffect(() => {
    document.title = "Login";
    // Check for saved email and password in localStorage
    const savedEmail = Cookies.get('se')
    const savedPassword = Cookies.get('sp')

    if (savedEmail && savedPassword) {
      setRememberMe(true);
      setSavedEmail(savedEmail);
      setSavedPassword(savedPassword);
    }
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

  // // automatically authenticate user if token is found
  // const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
  //   // perform a refetch every 15mins
  //   pollingInterval: 900000,
  // })

  // useEffect(() => {
  //   if (data) dispatch(setCredentials(data))
  // }, [data, dispatch])

  const onSubmitHandler = (data) => {

    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        // Registration successful, you can navigate or perform other actions
        console.log('Login successful');
        window.location.reload();
      })
      .catch((err) => {
        if (err && err.type === 'email') {
          setEmailError(true);
          setPasswordError(false);
        } else if (err && err.type === 'password') {
          setEmailError(false);
          setPasswordError(true);
        } else if (err && err.type === 'disabled') {
          setEmailError(false);
          setPasswordError(false);
          disableduser();
        } else {
        }
      })
      .finally(() => {
        // setLoading(false);
      });
  };
  


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
    Cookies.removeItem("se");
    Cookies.removeItem("sp");
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
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i,
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
                      // localStorage.setItem("savedEmail", savedEmail);
                      // localStorage.setItem("savedPassword", savedPassword);
                      Cookies.set('sp', savedPassword, { expires: 7, domain: localhost_domain, sameSite: 'strict'})
                      Cookies.set('se', savedEmail, { expires: 7, domain: localhost_domain, sameSite: 'strict'})
                      if (!e.target.checked) {
                        // Clear saved email and password when unchecked
                        // setSavedEmail("");
                        // setSavedPassword("");
                        Cookies.remove('sp')
                        Cookies.remove('se')
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
                {loading ? "Signing in..." : "Login"}
              </button>
              {disabledError && (
                <p className="text-red-500 ml-2">User is disabled. Please contact the admin and try again.</p>
              )}
              <p className="text-white poppins-font mt-10 text-center my-7">
                Don't have and account?
                <span
                  className="pl-2 underline cursor-pointer poppins-font font-semibold text-yellow-800"
                  onClick={() => {
                    navigate("/redeem-key");
                  }}
                >
                  {" "}
                  Redeem Key
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
