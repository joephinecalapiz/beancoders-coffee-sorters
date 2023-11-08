/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../../component/Navbar";
import api_endpoint from "../../config";
import Footer from "./Footer";

const ContactUs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false); // Add a state variable for login error
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [formData, setFormData] = useState({
        full_name: '',
        companyName: '',
        phoneNum: '',
        coffee_bean_ai_sorter: '',
        email: '',
        machine: false,
        website: false,
    });
    
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        document.title = "Contact Us";
    }, []);

    const onSubmitHandler = async (formData) => {
        // e.preventDefault();
        setLoading(true); // Set loading state to true when form is submitted

        // console.log(formData);
    
        try {
            const response = await axios.post(api_endpoint + "/post-feedback", formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                // Simulate an API call or any asynchronous operation
                setTimeout(() => {
                    setLoading(false); // Set loading to false when the operation is complete
                    // Reload the page or perform any desired action
                    // window.location.reload();
                }, 2000); // Simulate a 2-second delay
            }
        } catch (error) {
            console.error("Error", error.response ? error.response.data : error);
            if (error.response && error.response.status === 401) {
                setLoginError(true);
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-2 md:bg-bgLogin md:bg-cover min-h-screen bg-CoffeeBeans bg-cover">
                <section className="sm:mx-auto md:mx-24 lg:mx-32 xl:mx-48 items-center">
                    <form
                        className="rounded-[40px] p-8 max-w-xs w-full "
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <div className="w-[120%] mx-auto">
                            <h1 className="text-center text-white font-bold text-[40px] md:mt-28 md:mb-12 mt-20 mb-12">
                                Contact Us
                            </h1>
                            <label
                                className="block text-white mb-2"
                                htmlFor="name"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                Full Name
                            </label>
                            <input
                                name="full_name"
                                type="text"
                                placeholder=""
                                {...register("full_name", {
                                    required: "Full Name is required",
                                    pattern: {
                                        value: /^[a-zA-Z ]{2,30}$/,
                                        message: "Invalid Name",
                                    },
                                })}
                                checked={formData.full_name}
                                onChange={handleInputChange}
                                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.full_name ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />
                            {errors.full_name && (
                                <p className="text-red-500 ml-2">{errors.full_name.message}</p>
                            )}

<label
                                className="block text-white mb-2"
                                htmlFor="company"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                Company Name
                            </label>
                            <input
                                name="companyName"
                                type="text"
                                placeholder=""
                                {...register("companyName", {
                                    required: "Company name is required",
                                    pattern: {
                                        value: /^[a-zA-Z ]{2,30}$/,
                                        message: "Invalid Name",
                                    },
                                })}
                                checked={formData.companyName}
                                onChange={handleInputChange}
                                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.companyName ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />
                            {errors.companyName && (
                                <p className="text-red-500 ml-2">{errors.companyName.message}</p>
                            )}

                            <label
                                className="block text-white mb-2"
                                htmlFor="name"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                Phone Number
                            </label>
                            <input
                                name="phoneNum"
                                type="number"
                                placeholder=""
                                {...register("phoneNum", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^[\d-()+\s]*$/,
                                        message: "Invalid Phone Number",
                                    }
                                })}
                                checked={formData.phoneNum}
                                onChange={handleInputChange}
                                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.phoneNum ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />
                            {errors.phoneNum && (
                                <p className="text-red-500 ml-2">{errors.phoneNum.message}</p>
                            )}

                            <fieldset>
                                <legend className="block text-white mb-2"
                                    htmlFor="name"
                                    style={{ fontFamily: "Poppins, sans-serif" }}
                                >Select a product you need the help with the following:
                                </legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                name="coffee_bean_ai_sorter"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                {...register("coffee_bean_ai_sorter", {
                                                })}
                                                checked={formData.coffee_bean_ai_sorter}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="machine" className="font-medium text-white">
                                                Coffee Bean AI Sorter Machine
                                            </label>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center mb-10">
                                            <input
                                                name="website"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                {...register("website", {
                                                })}
                                                checked={formData.website}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="website" className="font-medium text-white">
                                                Website
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <label
                                className="block text-white mb-2"
                                htmlFor="message"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                Message
                            </label>
                            <textarea
                                    name="message"
                                    rows={3}
                                    className="block w-full mb-5 px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    placeholder="Explain here the issues, feedbacks, or your suggestions"
                                    {...register("message", {
                                    })}
                                    checked={formData.message}
                                    onChange={handleInputChange}
                            />

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
                                checked={formData.email}
                                onChange={handleInputChange}
                                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.email ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />
                            {errors.email && (
                                <p className="text-red-500 ml-2">{errors.email.message}</p>
                            )}
                            <button
                                type="submit"
                                className="btn w-full btn-primary mt-7 text-white"
                                style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}
                                disabled={loading}
                                // onClick={handleSubmit(onSubmitHandler)}
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
                                {loading ? "Loading..." : "Send Message"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
            <Footer></Footer>
        </>
    );
};

export default ContactUs;
