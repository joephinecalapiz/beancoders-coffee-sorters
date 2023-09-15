/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import api_endpoint from "../../config";
import Modal from "../../component/Modal";

const CompanyDetails = () => {
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [file, setFile] = useState();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const dataURL = e.target.result;
                setSelectedImage(dataURL); // Set selectedImage to display the preview
            };
    
            reader.readAsDataURL(file);
    
            // Set the file state
            setFile(file);
    
            // Print the file name
            console.log("Selected file name:", file.name);
        } else {
            setSelectedImage(null); // Clear the image preview if no file is selected
            setFile(null); // Clear the file state
        }
    };
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //---kanang console.log eh change rana para eh connect sa database
    const onSubmitHandler = (data) => {
        axios
            .post(api_endpoint + "/details", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
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
        //console.log(data);
    };

    useEffect(() => {
        document.title = "Company Details";
    }, []);

    return (
        <>
            {/* <Navbar /> */}
            <div className="grid grid-cols-2 md:bg-bgLogin md:bg-cover bg-CoffeeBeans  h-[100vh] w-full">
                <section className="sm:mx-auto md:mx-24 lg:mx-32 xl:mx-48 items-center">
                    <form
                        onSubmit={handleSubmit(onSubmitHandler)}
                        className="rounded-[40px] p-8 max-w-xs w-full"
                    >
                        <div className="md:w-[150%] w-[250%] mx-auto">
                            <h1 className="text-center text-white font-bold text-[30px] md:mt-25 md:mb-5 mt-20 mb-5">
                                Complete Registration
                            </h1>
                            <h5
                                className="text-center text-[15px] mb-5"
                                style={{ color: "white", fontFamily: "Poppins, sans-serif" }}
                            >
                                Enter your company information below.
                            </h5>
                            <input
                                name="companyName"
                                type="text"
                                placeholder="Enter your Company Name"
                                {...register("name", {
                                    required: "Company Name is required",
                                    pattern: {
                                        value: /^[a-zA-Z ]{2,30}$/,
                                        message: "Invalid Company Name",
                                    },
                                })}
                                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.companyName ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />

                            {errors.companyName && (
                                <p className="text-red-500 ml-2">{errors.companyName.message}</p>
                            )}

                            <input
                                name="companyNumber"
                                type="number"
                                placeholder="Enter your Phone Number"
                                {...register("companyNumber", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^[\d-()+\s]*$/,
                                        message: "Invalid Phone Number",
                                    }
                                })}
                                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.companyNumber ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />
                            {errors.companyNumber && (
                                <p className="text-red-500 ml-2">{errors.companyNumber.message}</p>
                            )}

                            <input
                                name="companyLocation"
                                type="text"
                                placeholder="Enter your Location"
                                {...register("companyLocation", {
                                    required: "Location is required",
                                    pattern: {
                                        value: /^[a-zA-Z ]{2,30}$/,
                                        message: "Invalid Location",
                                    },
                                })}
                                className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.companyLocation ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />

                            {errors.companyLocation && (
                                <p className="text-red-500 ml-2">{errors.companyLocation.message}</p>
                            )}

                            {/* Company Image */}
                            <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="mt-4 mx-auto h-24 w-24 object-contain"
                                />
                            <input
                                type="file"
                                onChange={handleImageChange}
                                id="file-upload"
                                name="file-upload"
                                accept="image/*"
                                {...register("images", {
                                    required: "Company Image is required",
                                })}
                                className={`w-full rounded-[10px] h-10 text-white px-4 ${errors.images ? "mb-2" : "mb-5"
                                    }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            />
                            {errors.images && (
                                <p className="text-red-500 ml-2">{errors.images.message}</p>
                            )}
                            <button
                                type="submit"
                                className="btn w-full btn-primary mt-10 text-white"
                                style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}
                                disabled={loading} // Disable the button when loading is true
                            >
                                {loading ? "Logging in..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
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

export default CompanyDetails;
