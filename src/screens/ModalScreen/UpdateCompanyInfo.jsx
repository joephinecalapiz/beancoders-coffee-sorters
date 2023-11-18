import React, { useState, useEffect } from "react";
import api_endpoint from "../../config";
import Modal from "../../component/Modal";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux'

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const UpdateCompanyInfo = ({ show, onClose }) => {
    const { token, user_id } = useSelector(
        (state) => state.auth
      )
    const [modalStep, setModalStep] = useState(1); // Track the current step of the modal
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [companyImage, setCompanyImage] = useState(null);
    // const [closeModal, setCloseModal] = useState(onClose);
    const [profileFileDataURL, setProfileFileDataURL] = useState(null);
    const [companyFileDataURL, setCompanyFileDataURL] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const profileImageHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setProfileImage(selectedFile);
    };

    const companyImageHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setCompanyImage(selectedFile);
    };

    useEffect(() => {
        let profileFileReader, companyFileReader;
        let isProfileCancel = false, isCompanyCancel = false;

        if (profileImage) {
            profileFileReader = new FileReader();
            profileFileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isProfileCancel) {
                    setProfileFileDataURL(result);
                }
            };
            profileFileReader.readAsDataURL(profileImage);
        }

        if (companyImage) {
            companyFileReader = new FileReader();
            companyFileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCompanyCancel) {
                    setCompanyFileDataURL(result);
                }
            };
            companyFileReader.readAsDataURL(companyImage);
        }

        return () => {
            isProfileCancel = true;
            isCompanyCancel = true;

            if (profileFileReader && profileFileReader.readyState === 1) {
                profileFileReader.abort();
            }
            if (companyFileReader && companyFileReader.readyState === 1) {
                companyFileReader.abort();
            }
        };
    }, [profileImage, companyImage]);

    const closeModal = () => {
        onClose();
    };

    const handleNextStep = () => {
        setModalStep((step) => step + 1);
    };

    const handlePreviousStep = () => {
        setModalStep((step) => step - 1);
    };

    const onSubmitHandler = (data) => {
        setLoading(true);
        const formData = new FormData()
        formData.append("user_id", user_id)
        formData.append("companyName", data.companyName)
        formData.append("companyNumber", data.companyNumber)
        formData.append("companyLocation", data.companyLocation)
        formData.append("profileAvatar", profileImage)
        formData.append("images", companyImage)
        axios
            .post(api_endpoint + "/add-info", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + token
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        setLoading(false);
                        closeModal();
                      }, 2000); 
                }
            })
            .catch((error) => {
                console.error("Error", error.response.data);
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
        //console.log(data);
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className="modal fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="absolute inset-0 bg-black opacity-50"
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="rounded max-w-sm mx-auto z-50">
                <span
                    className="modal-close bg-white absolute pl-5 pr-5 top-4 right-4 text-xl cursor-pointer"
                    onClick={closeModal}
                >
                    &times;
                </span>

                {modalStep === 1 && (
                    <>
                        <h2 className="text-2xl font-semibold dark:text-textTitle mb-4 text-center" htmlFor='image'> Profile Avatar </h2>
                        {profileFileDataURL ?
                            <p className="">
                                {
                                    <img src={profileFileDataURL} alt="preview" />
                                }
                            </p> : null}
                        <input
                            type="file"
                            id='image'
                            onChange={profileImageHandler}
                            accept='.png, .jpg, .jpeg'
                            className="mb-2 mt-4 flex justify-center dark:text-textTitle"
                        />

                        {/* buttons */}
                        <div className="flex justify-center mt-4">
                            {/* <button
                                onClick={handleUpdateProfileImage}
                                className="bg-green-500 text-white rounded px-4 py-2"
                            >
                                Upload Image
                            </button> */}
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 ml-2 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 2 && (
                    <>
                        <h2 className="text-2xl font-semibold dark:text-textTitle mb-4 text-center" htmlFor='CompImage'> Company Image </h2>
                        {companyFileDataURL ?
                            <p className="">
                                {
                                    <img src={companyFileDataURL} alt="preview" />
                                }
                            </p> : null}
                        <input
                            type="file"
                            id='CompImage'
                            onChange={companyImageHandler}
                            accept='.png, .jpg, .jpeg'
                            className="mb-2 mt-4 flex justify-center dark:text-textTitle"
                        />
                        {/* ... buttons ... */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            {/* <button
                                onClick={handleUpdateCompanyImage}
                                className="bg-green-500 text-white rounded px-4 py-2"
                            >
                                Upload Image
                            </button> */}
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 ml-2 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 3 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Enter Company Name
                        </h2>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            {...register("companyName", {
                                required: "Company Name is required",
                                pattern: {
                                    value: /^[a-zA-Z ]{2,30}$/,
                                    message: "Invalid Company Name",
                                },
                            })}
                            className={`bg-white w-full rounded-[10px] h-10 text-black px-4 ${errors.companyName ? "mb-2" : "mb-5"
                                }`}
                            style={{ fontFamily: "Poppins, sans-serif" }}
                            // className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        />
                        {errors.companyName && (
                                <p className="text-red-500 ml-2">{errors.companyName.message}</p>
                        )}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 4 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Company Phone Number
                        </h2>
                        <input
                            type="text"
                            value={companyPhoneNumber}
                            onChange={(e) => setCompanyPhoneNumber(e.target.value)}
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
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 5 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Company Address
                        </h2>
                        <input
                            type="text"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
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
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleSubmit(onSubmitHandler)}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
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
                                {loading ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </>
                )}
            </div>
            </form>
        </Modal>
    );
};

export default UpdateCompanyInfo;