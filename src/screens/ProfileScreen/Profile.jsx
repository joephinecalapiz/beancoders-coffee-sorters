/** @format */

import React, { useState, useEffect } from "react";
import beansLogo from "../../assets/beansLogo.png"; // Import the image
import api_endpoint from "../../config";
import image_endpoint from "../../image-config";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from "../../../redux/services/user/userActions";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const companyInfo = useSelector(state => state.user.companyInfo);
  const userInfo = useSelector(state => state.user.userInfo);
  const [navVisible, showNavbar] = useState(true);
  const [isEditing, setEditing] = useState(false);
  // const [userInfo, setUserInfo] = useState("");
  const [compInfo, setCompInfo] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [file, setFile] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [profileData, setProfileData] = useState({
    profilePicture: "assets/beansLogo.png",
    name: userInfo.name,
    email: userInfo.email,
    companyNumber: companyInfo.companyNumber,
    companyLocation: companyInfo.companyLocation,
    companyName: companyInfo.companyName,
    images: companyInfo.images,
    profileAvatar: companyInfo.profileAvatar,
  });
  const [editableContent, setEditableContent] = useState({
    companyName: profileData.companyName,
    companyNumber: profileData.companyNumber,
    companyLocation: profileData.companyLocation,
    images: profileData.images,
    profileAvatar: profileData.profileAvatar,
  });
  const [editableProfile, setEditableProfile] = useState({
    name: profileData.name,
    email: profileData.email,
  });

  useEffect(() => {
    const handleResize = () => {
      showNavbar(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    // fetchUserInfo(); // Fetch user info when the component mounts
    // fetchCompanyInfo();
    dispatch(fetchUserDetails({ token }));
  }, [dispatch]);

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

      // Set the selected image in editableContent
      setEditableContent((prevEditableContent) => ({
        ...prevEditableContent,
        images: file.name, // Use the selected file here
      }));

      // Print the file name
      console.log("Selected file name:", file);
    } else {
      setSelectedImage(null); // Clear the image preview if no file is selected
      setFile(null); // Clear the file state

      // Clear the selected image in editableContent
      setEditableContent((prevEditableContent) => ({
        ...prevEditableContent,
        images: null,
      }));
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   const cachedCustomerData = sessionStorage.getItem("profile photo");

  //   if (cachedCustomerData) {
  //     setCompInfo(JSON.parse(cachedCustomerData));
  //   }
  // }, []);

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
      companyNumber: companyInfo.companyNumber,
      companyLocation: companyInfo.companyLocation,
      companyName: companyInfo.companyName,
      images: companyInfo.images,
      profileAvatar: companyInfo.profileAvatar,
    }));
  }, [userInfo, companyInfo]);

  // Update editableContent when userInfo want to edit
  useEffect(() => {
    setEditableContent((prevProfileData) => ({
      ...prevProfileData,
      companyNumber: companyInfo.companyNumber,
      companyLocation: companyInfo.companyLocation,
      companyName: companyInfo.companyName,
      images: companyInfo.images,
      profileAvatar: companyInfo.profileAvatar,
    }));
    setEditableProfile((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
    }));
  }, [userInfo, companyInfo]);

  // const fetchUserInfo = async () => {
  //   try {
  //     const response = await fetch(api_endpoint + "/user", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Erro("Failed to fetch user data");
  //     }
  //     const data = await response.json();
  //     setUserInfo(data.user);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // const fetchCompanyInfo = async () => {
  //   try {
  //     const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch company details data");
  //     }
  //     const compData = await response.json();
  //     setCompInfo(compData.details);
  //     if (sessionStorage.getItem("profile photo") === null) {
  //       sessionStorage.setItem(
  //         "profile photo",
  //         JSON.stringify(compData.details)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching company details data:", error);
  //   }
  // };

  const updateCompanyDetails = async (newDetails) => {
    try {
      const response = await fetch(api_endpoint + `/edit-info/${user_id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDetails), // Make sure newDetails contains the updated data
      });
      console.log(newDetails);
      if (!response.ok) {
        throw new Error("Failed to update company details");
      }

      // Handle success response
      console.log("Company details updated successfully");
      console.log(user_id);
    } catch (error) {
      console.error("Error updating company details:", error);
    }
  };

  const updateProfileInfo = async (newDetails) => {
    try {
      const response = await fetch(api_endpoint + `/update-user/${user_id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDetails), // Make sure newDetails contains the updated data
      });

      if (!response.ok) {
        throw new Error("Failed to update profile details");
      }
    } catch (error) {
      console.error("Error updating profile details:", error);
    }
  };

  useEffect(() => {
    document.title = "Profile";
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    setProfileData({
      ...profileData,
      name: editableProfile.name,
      email: editableProfile.email,
      companyName: editableContent.companyName,
      companyNumber: editableContent.companyNumber,
      companyLocation: editableContent.companyLocation,
      images: editableContent.images,
      profileAvatar: editableContent.profileAvatar,
    });
    // update the details on the server
    updateCompanyDetails(editableContent);
    console.log(editableContent);
    updateProfileInfo(editableProfile);
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset the editableContent to match the current profileData
    setEditableContent({
      companyName: profileData.companyName,
      companyNumber: profileData.companyNumber,
      companyLocation: profileData.companyLocation,
      images: profileData.images,
      profileAvatar: profileData.profileAvatar,
    });
    setEditableProfile({
      name: profileData.name,
      email: profileData.email,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
    setEditableProfile((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  return (
    <>
      <Topbar
        onToggleSidebar={toggleSidebar}
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      />
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <div
        className={`main relative z-5 inset-0 mt-16  ${!navVisible ? "sm:ml-60" : "sm:ml-16"
          }`}
        style={{
          transition: "margin-left 0.3s ease",
        }}
      >
        <div>
          <div className="md:pl-5 md:pr-5 pr-2 pl-2 pt-0.5 mb-10">
            <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
              Profile
            </h1>
          </div>
          <div className="md:pl-5 md:pr-5 pr-2 pl-2">
            <div
              className="sticky bg-white dark:bg-container rounded-xl shadow-lg overflow-hidden  bg-cover bg-center "
              style={{
                backgroundImage:
                  profileData.images && profileData.images.length > 0
                    ? `url("${image_endpoint}/storage/${profileData.images.slice(
                      2,
                      -2
                    )}")`
                    : "",
              }}
            >
              <div className="flex flex-col items-start justify-start ml-3">
                <div className="relative md:mt-26 mt-28">
                  <label
                    htmlFor="profilePicture"
                    className="profile-picture-label"
                  >
                    <img
                      src={
                        profileData.profileAvatar &&
                          profileData.profileAvatar.length > 0
                          ? `${image_endpoint}/storage/${profileData.profileAvatar.slice(
                            2,
                            -2
                          )}`
                          : beansLogo
                      }
                      alt="profile picture"
                      className={`circular-profile bg-white ${isMobile ? "mt-4" : "mt-28"
                        } z-100`}
                    />
                  </label>
                </div>

                {/* <div
                className={`text-start ${
                  isMobile
                    ? "bg-gray w-full h-10 pl-5"
                    : "bg-black w-64 h-32 p-6"
                }`}
              >
                <div className=" flex-col items-start">
                  <label className="admin-name text-white dark:text-textTitle poppins-font drop-shadow-2xl ">
                    {profileData.name}
                  </label>

                  <label className="admin-label text-white dark:text-textDesc poppins-font mb-5 drop-shadow-4xl">
                    Admin
                  </label>
                </div>
              </div> */}
              </div>
            </div>
            <div className=" mt-5 overflow-hidden lg:max-w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1">
                <div className="flex items-center justify-center sm:justify-self-start col-span-2">
                  <h1
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                    className="text-black"
                  >
                    {/* User Information */}
                  </h1>
                </div>
                <div className="flex items-center justify-center sm:justify-self-end">
                  {isEditing ? (
                    <div className="profile-edit-buttons">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mr-2"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                      <button
                        className="flex bg-hoverBrown hover:bg-lightBrown poppins-font text-white font-bold py-2 md:px-6 px-8 rounded-full"
                        onClick={handleEditClick}
                      >
                        <span className="material-symbols-outlined pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </span>
                        Edit
                      </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 md:gap-1 gap-7">
                <div className="sm:w-11/12  md:ml-2 md:justify-self-start bg-white  dark:bg-container rounded-xl shadow-lg overflow-hidden ">
                  <div className="mobile:px-8 mt-5">
                    <div>
                      <div className="px-4 md:px-1 align-center justify-center">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 poppins-font dark:text-textTitle">
                          Admin Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 poppins-font dark:text-textDesc">
                          Admin details.
                        </p>
                      </div>
                      <div className="mt-6 border-t border-gray-100">
                        <div className="divide-y divide-gray-100">
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-semibold poppins-font leading-6 text-gray-900 dark:text-textTitle">
                              Full name
                            </dt>
                            {isEditing ? (
                              <div className="flex sm:col-span-2 sm:mt-0 justify-self-end relative">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  value={editableProfile.name}
                                  autoComplete="name"
                                  onChange={handleInputChange}
                                  className="block flex-1 border-0 dark:text-textDesc bg-transparent py-1.5 pl-1 poppins-font text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder={profileData.name}
                                  style={{ outline: "none" }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gray"></div>
                              </div>
                            ) : (
                              <dd className="mt-1 text-sm poppins-font dark:text-textDesc leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
                                {profileData.name}
                              </dd>
                            )}
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm poppins-font font-semibold leading-6 text-gray-900 dark:text-textTitle">
                              Role
                            </dt>
                            <dd className="mt-1 text-sm poppins-font leading-6 text-gray-900 dark:text-textDesc sm:col-span-2 sm:mt-0 justify-self-end">
                              Admin
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm poppins-font font-semibold leading-6 text-gray-900 dark:text-textTitle">
                              Email address
                            </dt>
                            {isEditing ? (
                              <div className="flex sm:col-span-2 sm:mt-0 justify-self-end relative">
                                {" "}
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={editableProfile.email}
                                  onChange={handleInputChange}
                                  autoComplete="email"
                                  className="block flex-1 border-0 dark:text-textDesc bg-transparent py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder={profileData.email}
                                  style={{ outline: "none" }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-black"></div>
                              </div>
                            ) : (
                              <dd className="mt-1 text-sm leading-6 sm:col-span-2 poppins-font dark:text-textDesc sm:mt-0 justify-self-end">
                                {profileData.email}
                              </dd>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-2xl:mt-5 md:col-span-2  bg-white dark:bg-container rounded-xl shadow-lg overflow-hidden ">
                  <div className="mobile:px-5 mt-5">
                    <div>
                      <div className="px-4 sm:px-0 align-center justify-center">
                        <h3 className="text-base poppins-font font-semibold leading-7 text-gray-900 dark:text-textTitle">
                          Company Information
                        </h3>
                        <p className="mt-1 max-w-2xl poppins-font text-sm leading-6 text-gray-500 dark:text-textDesc">
                          Company details.
                        </p>
                      </div>
                      <div className="mt-6 border-t border-gray-100">
                        <div className="divide-y divide-gray-100">
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm poppins-font font-semibold leading-6 text-gray-900 align-center self-center dark:text-textTitle">
                              Company Name
                            </dt>
                            {isEditing ? (
                              <div className="flex sm:col-span-2 sm:mt-0 justify-self-end relative">
                                <input
                                  type="name"
                                  name="companyName"
                                  id="companyName"
                                  autoComplete="companyName"
                                  value={editableContent.companyName}
                                  onChange={handleInputChange}
                                  className="block flex-1 border-0 bg-transparent poppins-font dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder={profileData.companyName}
                                  style={{ outline: "none" }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-black"></div>
                              </div>
                            ) : (
                              <dd className="mt-1 text-sm leading-6 bg-transparent dark:text-textDesc sm:col-span-2 sm:mt-0 justify-self-end">
                                {profileData.companyName}
                              </dd>
                            )}
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm poppins-font font-semibold leading-6 text-gray-900 dark:text-textTitle">
                              Phone Number
                            </dt>
                            {isEditing ? (
                              <div className="flex sm:col-span-2 sm:mt-0 justify-self-end relative">
                                <input
                                  type="number"
                                  name="companyNumber"
                                  id="phoneNumber"
                                  autoComplete="phoneNumber"
                                  value={editableContent.companyNumber}
                                  onChange={handleInputChange}
                                  className="block flex-1 border-0 bg-transparent poppins-font dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder={profileData.companyNumber}
                                  style={{ outline: "none" }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-black"></div>
                              </div>
                            ) : (
                              <dd className="mt-1 text-sm leading-6 sm:col-span-2 poppins-font dark:text-textDesc sm:mt-0 justify-self-end">
                                {profileData.companyNumber}
                              </dd>
                            )}
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm poppins-font font-semibold leading-6 poppins-font text-gray-900 dark:text-textTitle">
                              Address
                            </dt>
                            {isEditing ? (
                              <div className="flex sm:col-span-2 sm:mt-0 justify-self-end relative">
                                <input
                                  type="text"
                                  name="companyLocation"
                                  id="address"
                                  autoComplete="address"
                                  value={editableContent.companyLocation}
                                  onChange={handleInputChange}
                                  className="block flex-1 border-0 bg-transparent poppins-font dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder={profileData.companyLocation}
                                  style={{ outline: "none" }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-black"></div>
                              </div>
                            ) : (
                              <dd className="mt-1 text-sm leading-6 sm:col-span-2 poppins-font dark:text-textDesc sm:mt-0 justify-self-end">
                                {profileData.companyLocation}
                              </dd>
                            )}
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm poppins-font font-semibold leading-6 text-gray-900 dark:text-textTitle">
                              Company Image
                            </dt>
                            {isEditing ? (
                              <div className="flex sm:col-span-2 sm:mt-0 justify-self-end relative">
                                <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="block flex-1 border-0 bg-transparent dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  style={{ outline: "none" }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-black"></div>
                              </div>
                            ) : (
                              <dd className="mt-1 text-sm poppins-font leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
                                Insert Image
                              </dd>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center"></div>
          <br />
        </div>
      </div>
    </>
  );
};

export default Profile;
