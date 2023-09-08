/** @format */

import React, { useState, useEffect } from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/Sidebar.css";
import "../.././css/dashboard.css";
import "../.././css/profile.css";
import beansLogo from "../../assets/beansLogo.png"; // Import the image
import api_endpoint from "../../config";

const Profile = () => {
  const [navVisible, showNavbar] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    fetchUserInfo(); // Fetch user info when the component mounts
  }, []);

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
    }));
  }, [userInfo]);

  // Update editableContent when userInfo want to edit
  useEffect(() => {
    setEditableContent((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
    }));
  }, [userInfo]);

  const fetchUserInfo = async () => {
    let token = localStorage.getItem('token');
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

  const [profileData, setProfileData] = useState({
    profilePicture: "assets/beansLogo.png",
    name: userInfo.name,
    companyPhoneNumber: "9518052760",
    address: "123 Main St, City",
    companyName: "ABC Corporation",
  });

  const [editableContent, setEditableContent] = useState({
    name: profileData.name,
    companyName: profileData.companyName,
    companyPhoneNumber: profileData.companyPhoneNumber,
    address: profileData.address,
  });

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  // useEffect(() => {
  //   document.title = "Profile";

  //   if (navVisible) {
  //     document.body.style.overflow = "hidden"; // Disable scrolling
  //   } else {
  //     document.body.style.overflow = "auto"; // Enable scrolling
  //   }

  //   return () => {
  //     // Clean up the effect when the component unmounts
  //     document.body.style.overflow = "auto"; // Enable scrolling
  //   };
  // }, [navVisible]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    setProfileData({
      ...profileData,
      name: editableContent.name,
      companyName: editableContent.companyName,
      companyPhoneNumber: editableContent.companyPhoneNumber,
      address: editableContent.address,
    });
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  return (
    <>
      <div class="max-w-8xl mx-auto pl-16">
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <Topbar onToggleSidebar={toggleSidebar} />
        <div className={`Profile  ${navVisible ? "profile-shift-right" : ""}`}
        //  style={{ backgroundColor: '#d4d4d4' }}
        >
          <div className={`p-5 pl-12 ${navVisible ? "mx-5" : "mobile:ml-40"}`}>
            <div className="flex items-center">
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                }}
                className="text-black mt-16 mb-3"
              >
                Profile
              </h1>

            </div>
          </div>
          <div className={`p-5 ${navVisible ? "" : "ml-36"}`}>
            <div class="contentNav max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-full">
              <div class="flex flex-col items-center justify-center ">
                <div className="top relative circular-profile object-none object-top overflow-visible">
                  <label
                    htmlFor="profilePicture"
                    className="profile-picture-label"
                  >
                    <img
                      src={beansLogo}
                      alt="Beans Logo"
                      className="admin-picture"
                      onClick={handleProfilePictureClick}
                    />
                  </label>
                  <input
                    type="file"
                    id="profilePictureInput"
                    name="profilePicture"
                    onChange={handleInputChange}
                    style={{ display: "none" }}
                  />
                </div>
                <label className="admin-name poppins-font justify-center">{profileData.name}</label>
                <label className="admin-label poppins-font mb-5 justify-center">Admin</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
