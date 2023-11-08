/** @format */

import React, { useState, useEffect } from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/Sidebar.css";
import "../.././css/dashboard.css";
import "../.././css/profile.css";
import beansLogo from "../../assets/beansLogo.png"; // Import the image
import api_endpoint from "../../config";
import image_endpoint from "../../image-config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Profile = () => {
  const [navVisible, showNavbar] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [compInfo, setCompInfo] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    profilePicture: "assets/beansLogo.png",
    name: userInfo.name,
    email: userInfo.email,
    companyNumber: compInfo.companyNumber,
    companyLocation: compInfo.companyLocation,
    companyName: compInfo.companyName,
    images: compInfo.images,
    profileAvatar: compInfo.profileAvatar
  });
  const [editableContent, setEditableContent] = useState({
    companyName: profileData.companyName,
    companyNumber: profileData.companyNumber,
    companyLocation: profileData.companyLocation,
    images: file,
    profileAvatar: profileData.images,
  });
  const [editableProfile, setEditableProfile] = useState({
    name: profileData.name,
    email: profileData.email,
  });

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
        console.log("Selected file name:", file);
    } else {
        setSelectedImage(null); // Clear the image preview if no file is selected
        setFile(null); // Clear the file state
    }
};


  useEffect(() => {
    fetchUserInfo(); // Fetch user info when the component mounts
    fetchCompanyInfo();

    const role = localStorage.getItem("role");
    // Check if the user_id is not 1 and navigate back if necessary
    if (role !== "2") {
      navigate("/permission-denied"); // Go back to the previous page
      // window.location.reload();
    }
  }, []);

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
      companyNumber: compInfo.companyNumber,
      companyLocation: compInfo.companyLocation,
      companyName: compInfo.companyName,
      images: compInfo.images,
      profileAvatar: compInfo.profileAvatar
    }));
  }, [userInfo]);

  // Update editableContent when userInfo want to edit
  useEffect(() => {
    setEditableContent((prevProfileData) => ({
      ...prevProfileData,
      companyNumber: compInfo.companyNumber,
      companyLocation: compInfo.companyLocation,
      companyName: compInfo.companyName,
      images: compInfo.images,
      profileAvatar: compInfo.profileAvatar
    }));
    setEditableProfile((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
    }));
  }, [userInfo]);

  const fetchUserInfo = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch(api_endpoint + "/user", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Erro("Failed to fetch user data");
      }
      const data = await response.json();
      setUserInfo(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch company details data");
      }
      const compData = await response.json();
      setCompInfo(compData.details);
    } catch (error) {
      console.error("Error fetching company details data:", error);
    }
  };

  const updateCompanyDetails = async (newDetails) => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");
      const response = await fetch(api_endpoint + `/edit-info/${user_id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDetails), // Make sure newDetails contains the updated data
      });

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
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");
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


  const toggleSidebar = () => {
    showNavbar(!navVisible);
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
    console.log(editableContent)
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
      <div className="max-w-8xl mx-auto pl-16">
        <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <Topbar
          onToggleSidebar={toggleSidebar}
          collapsed={navVisible}
          handleToggleSidebar={toggleSidebar}
        />
        <div
          className={`Profile  ${navVisible ? "profile-shift-right" : ""}`}
        //  style={{ backgroundColor: '#d4d4d4' }}
        >
          <div className={`p-4 ${navVisible ? "ml-0" : "sm:ml-48"}`}>
            <div className="p-0.5 mb-5 w-full mt-7 relative">
              <h1 className="text-black bg-white dark:text-textTitle dark:bg-container mt-10 font-bold text-base p-3 rounded-lg shadow-xl">
                Profile
              </h1>
            </div>
            <div className={`p-4 ${navVisible ? "ml-0" : ""}`}>
              <div className="max-w-2xl bg-white dark:bg-container object-fill rounded-xl shadow-lg overflow-hidden lg:max-w-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: profileData.images && profileData.images.length > 0
                    ? `url("${image_endpoint}/storage/${profileData.images.slice(2, -2)}")`
                    : ""
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="top relative circular-profile object-none object-top overflow-visible">
                    <label htmlFor="profilePicture" className="profile-picture-label">
                      <img
                        src={
                          profileData.profileAvatar && profileData.profileAvatar.length > 0
                            ? `${image_endpoint}/storage/${profileData.profileAvatar.slice(2, -2)}`
                            : beansLogo
                        }
                        alt="profile picture"
                        className="admin-picture bg-white"
                      />
                    </label>
                  </div>
                  <label className="admin-name text-black dark:text-textTitle poppins-font justify-center bg-gray-1000 drop-shadow-2xl">
                    {profileData.name}
                  </label>

                  <label className="admin-label text-black dark:text-textDesc poppins-font mb-5 justify-center drop-shadow-4xl">
                    Admin
                  </label>
                </div>
              </div>
              <div className="max-w-2xl mt-5 overflow-hidden lg:max-w-full">
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
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="max-w-2xl mt-5 overflow-hidden space-x-36 lg:max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 gap-2">
                  <div className="sm:w-11/12 w-11/12 ml-2 sm:justify-self-start bg-white dark:bg-container rounded-xl shadow-lg overflow-hidden ">
                    <div className="mobile:px-5 mt-5">
                      <div>
                        <div className="px-4 sm:px-0 align-center justify-center">
                          <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-textTitle">
                            Admin Information
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-textDesc">
                            Admin details.
                          </p>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                          <div className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
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
                                    className="block flex-1 border-0 dark:text-textDesc bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.name}
                                    style={{ outline: "none" }}
                                  />
                                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gray"></div>
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm dark:text-textDesc leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
                                  {profileData.name}
                                </dd>
                              )}
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
                                Role
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-900 dark:text-textDesc sm:col-span-2 sm:mt-0 justify-self-end">
                                Admin
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
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
                                <dd className="mt-1 text-sm leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
                                  {profileData.email}
                                </dd>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-2xl:mt-5 col-span-2 max-w-2xl bg-white dark:bg-container rounded-xl shadow-lg overflow-hidden lg:max-w-full">
                    <div className="mobile:px-5 mt-5">
                      <div>
                        <div className="px-4 sm:px-0 align-center justify-center">
                          <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-textTitle">
                            Company Information
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-textDesc">
                            Company details.
                          </p>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                          <div className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 align-center self-center dark:text-textTitle">
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
                                    className="block flex-1 border-0 bg-transparent dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
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
                                    className="block flex-1 border-0 bg-transparent dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.companyNumber}
                                    style={{ outline: "none" }}
                                  />
                                  <div className="absolute inset-x-0 bottom-0 h-1 bg-black"></div>
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
                                  {profileData.companyNumber}
                                </dd>
                              )}
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
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
                                    className="block flex-1 border-0 bg-transparent dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.companyLocation}
                                    style={{ outline: "none" }}
                                  />
                                  <div className="absolute inset-x-0 bottom-0 h-1 bg-black"></div>
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
                                  {profileData.companyLocation}
                                </dd>
                              )}
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
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
                                <dd className="mt-1 text-sm leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

