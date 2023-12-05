/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/Navbar";
import { useForm } from "react-hook-form";
import Modal from "../../../component/Modal";
import Footer from "../Footer";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../../../../redux/services/auth/authActions";
import KeyVerificationModal from "../../../component/KeyVerificationModal";

const Signup = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  const [showVerifyKeyModal, setShowVerifyKeyModal] = useState(false);
  const [keyValidated, setKeyValidated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()
  

  //---kanang console.log eh change rana para eh connect sa database
  // const onSubmitHandler = (data) => {
  //   setLoading(true); // Set loading state to true when form is submitted
  //   axios
  //     .post(api_endpoint + "/register/users", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // setPopupMessage("Done registered your account, you can now login");
  //         const token = response.data.token;
  //         const user_id = response.data.user.id;
  //         setTimeout(() => {
  //           setLoading(false); // Set loading to false when the operation is complete
  //           navigate("/company");
  //         }, 2000); // Simulate a 2-second delay
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response && err.response.status === 422) {
  //         const error = err.response.data.error;
  //         if (error.email) {
  //           const emailError = error.email[0];
  //           setPopupMessage("The email has already been taken");
  //           setLoading(false);

  //           // alert(emailError);
  //         }

  //         if (error.name) {
  //           const nameError = error.name[0];
  //           alert(nameError);
  //           setLoading(false);
  //         }
  //       } else {
  //         console.error("Error occured", err);
  //         setLoading(false);
  //       }
  //     });
  //   //console.log(data);
  // };

  const onSubmitHandler = (data) => {
    // setLoading(true);

    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        // Registration successful, you can navigate or perform other actions
        setTimeout(() => {
          // setLoading(false); // Set loading to false when the operation is complete
          navigate("/company");
          // window.location.reload();
        }, 2000);
        console.log('Registration successful');
      })
      .catch((err) => {
        if (err && err.type === 'email') {
          setPopupMessage(err.message);
          // setLoading(false);
        } else if (err && err.type === 'name') {
          setPopupMessage(nameError);
          // setLoading(false);
        } else {
          console.error('Error during registration:', err);
          // setLoading(false);
        }
      })
      .finally(() => {
        // setLoading(false);
      });      
  }

  useEffect(() => {
     if (token) {
      if (role == 2) navigate('/dashboard')
      if (role == 1) navigate('/superadmin/manageusers')
    }
    document.title = "Sign Up";
  }, []);

//   useEffect(() =>{
//     const token = localStorage.getItem('token');
//     if (token) {
//       // If there's a token, navigate back to the previous page
//       navigate("/dashboard")
//     }  
// })

  const openVerifyKeyModal = () => {
    setShowVerifyKeyModal(true);
  };

  const closeVerifyKeyModal = () => {
    setShowVerifyKeyModal(false);
    setKeyValidated(true);
  };

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
              <h1 className="text-center text-white font-bold text-[30px] md:mt-24 md:mb-12 mt-20 mb-12 poppins-font">
                Create Account
              </h1>
              {/* <label className="block text-white mb-2" htmlFor="email">
                Full Name
              </label> */}
              <input
                name="name"
                type="text"
                placeholder="Fullname"
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
              />

              {errors.name && (
                <p className="text-red-500 ml-2">{errors.name.message}</p>
              )}
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
                onChange={(e) => {
                  localStorage.setItem("savedPassword", e.target.value);
                }}
                className={`bg-white w-full rounded-[10px] mt-2 h-10 text-black poppins-font px-4 ${
                  errors.password ? "mb-2" : "mb-5"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 ml-2">{errors.password.message}</p>
              )}
              {keyValidated ? (
                <button
                type="submit"
                className="btn w-full btn-primary mt-7 text-white"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}
                // disabled={loading}
                onClick={handleSubmit(onSubmitHandler)}
              >
                Sign Up
              </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                  onClick={openVerifyKeyModal}
                >
                  Submit
                </button>
              )}
              <KeyVerificationModal
                isOpen={showVerifyKeyModal}
                onClose={closeVerifyKeyModal}
              />
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
