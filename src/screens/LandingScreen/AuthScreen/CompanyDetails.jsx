/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import api_endpoint from "../../../config";
import Modal from "../../../component/Modal";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CompanyDetails = () => {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [file, setFile] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const [companyImage, setCompanyImage] = useState(null);
  const [profileFileDataURL, setProfileFileDataURL] = useState(null);
  const [companyFileDataURL, setCompanyFileDataURL] = useState(null);

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
    let isProfileCancel = false,
      isCompanyCancel = false;

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

  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  //---kanang console.log eh change rana para eh connect sa database
  const onSubmitHandler = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("companyName", data.companyName);
    formData.append("companyNumber", data.companyNumber);
    formData.append("companyLocation", data.companyLocation);
    formData.append("images", data.images);
    formData.append("profileAvatar", data.profileAvatar);
    console.log(companyFileDataURL);
    console.log(profileFileDataURL);
    axios
      .post(api_endpoint + "/add-info", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setPopupMessage("Company Information is set!");
            setLoading(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error", error.response.data);
        if (error.response.status === 401) {
          setLoginError(true);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
    //console.log(data);
  };

  const closeMessage = () => {
    setPopupMessage(null)
    navigate('/login')
    localStorage.removeItem("token")
  }

  useEffect(() => {
    document.title = "Company Details";
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="md:bg-bgLogin md:bg-cover min-h-screen bg-CoffeeBeans bg-cover">
        <section className="sm:mx-auto md:mx-24 lg:mx-32 xl:mx-48 items-center">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="rounded-[40px] p-8 max-w-xs w-full"
          >
            <div className="w-[145%] justify-center poppins-font">
              <h1 className="text-center text-white font-bold text-[30px] md:mt-24 md:mb-5 mt-20 mb-5 poppins-font">
                Complete Registration
              </h1>
              <h5 className="text-center text-white text-[15px] poppins-font mb-10 md:mb-4">
                Enter your company information below.
              </h5>
              {/* <label
                className="block text-white mb-2"
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Company Name
              </label> */}
              <input
                type="hidden"
                placeholder="Company Name"
                name="user_id"
                value={user_id}
                {...register("user_id")} // Register the hidden field
              />
              <input
                name="companyName"
                type="text"
                placeholder="Company Name"
                {...register("companyName", {
                  required: "Company Name is required",
                  pattern: {
                    value: /^[a-zA-Z ]{2,30}$/,
                    message: "Invalid Company Name",
                  },
                })}
                className={`bg-white w-full rounded-[10px] md:mt-2 h-10 text-black px-4 ${
                  errors.companyName ? "mb-2" : "mb-5"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              />

              {errors.companyName && (
                <p className="text-red-500 ml-2">
                  {errors.companyName.message}
                </p>
              )}
              {/* <label
                className="block text-white mb-2"
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Phone Number
              </label> */}
              <input
                name="companyNumber"
                type="number"
                placeholder="Phone Number"
                {...register("companyNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[\d-()+\s]*$/,
                    message: "Invalid Phone Number",
                  },
                })}
                className={`bg-white w-full rounded-[10px] md:mt-1 mt-4 h-10 text-black px-4 ${
                  errors.companyNumber ? "mb-2" : "mb-5"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.companyNumber && (
                <p className="text-red-500 ml-2">
                  {errors.companyNumber.message}
                </p>
              )}
              {/* <label
                className="block text-white mb-2"
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Company Address
              </label> */}
              <input
                name="companyLocation"
                type="text"
                placeholder="Company Address"
                {...register("companyLocation", {
                  required: "Location is required",
                  pattern: {
                    value: /^[a-zA-Z ]{2,30}$/,
                    message: "Invalid Location",
                  },
                })}
                className={`bg-white w-full rounded-[10px]  md:mt-1 mt-3 h-10 text-black px-4 ${
                  errors.companyLocation ? "mb-2" : "mb-5"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              />

              {errors.companyLocation && (
                <p className="text-red-500 ml-2">
                  {errors.companyLocation.message}
                </p>
              )}
              {/* Profile Image */}
              <label
                className="block poppins-font text-white mt-3 mb-2"
                htmlFor="email"
              >
                Profile Avatar
              </label>
              {profileFileDataURL ? (
                <p className="poppins-font">
                  {<img src={profileFileDataURL} alt="preview" />}
                </p>
              ) : null}
              <input
                type="file"
                onChange={profileImageHandler}
                id="profileAvatar"
                name="profileAvatar"
                accept="image/*"
                {...register("profileAvatar", {
                  //required: "Company Image is required",
                })}
                className={`w-full rounded-[10px] mt-3 md:mt-1 h-10 text-white px-4 ${
                  errors.profileAvatar ? "mb-2" : "mb-5"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.profileAvatar && (
                <p className="text-red-500 ml-2">
                  {errors.profileAvatar.message}
                </p>
              )}

              {/* Company Image */}
              <label
                className="block text-white mb-2"
                htmlFor="email"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Company Photo
              </label>
              {companyFileDataURL ? (
                <p className="">
                  {<img src={companyFileDataURL} alt="preview" />}
                </p>
              ) : null}
              <input
                type="file"
                onChange={companyImageHandler}
                id="images"
                name="images"
                accept="image/*"
                {...register("images", {
                  //required: "Company Image is required",
                })}
                className={`w-full rounded-[10px] md:mt-1 mt-3 h-10 text-white px-4 ${
                  errors.images ? "mb-2" : ""
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.images && (
                <p className="text-red-500 ml-2">{errors.images.message}</p>
              )}
              <button
                type="submit"
                className="btn w-full mt-5 btn-primary text-white"
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
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </section>
      </div>
      <Modal
        isOpen={popupMessage !== null}
        onClose={closeMessage}
        showCloseButton={true}
      >
        {popupMessage}
      </Modal>
    </>
  );
};

export default CompanyDetails;
