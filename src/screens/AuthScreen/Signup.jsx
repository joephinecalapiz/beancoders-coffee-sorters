import React from "react";
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
                Register your account
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
                className={`bg-[#512615] w-full rounded-[20px] h-10 text-white px-4 ${
                  errors.name ? "mb-2" : "mb-5"
                }`}
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

              <button
                type="submit"
                className="btn w-full btn-primary mt-7 text-white"
              >
                REGISTER
              </button>
              <p className="text-center my-7">
                Already have an account?
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    navigate("/login");
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
