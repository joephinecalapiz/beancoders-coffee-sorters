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
  const [navVisible, showNavbar] = useState(false);
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
    } catch (error){
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

  useEffect(() => {
    document.title = "Profile";

    if (navVisible) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      // Clean up the effect when the component unmounts
      document.body.style.overflow = "auto"; // Enable scrolling
    };
  }, [navVisible]);

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
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className={`App ${navVisible ? "content-shift-right" : ""}`}
      style={{ backgroundColor: '#d4d4d4' }}
      >
        <div className={`p-10 ${navVisible ? "ml-0" : "sm:ml-64"}`}>
          <div className="flex items-center">
            <h1 className="profile-title">Profile</h1>
          </div>
          <div className={`profile-content`}>
            <div className=" profile-section">
              <div className="profile-picture-container">
                <div className="circular-profile">
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
                <div className="admin-label">
                  <label className="poppins-font">Admin</label>
                </div>
              </div>
              <div className="profile-details">
                <div className="input-text">
                  <label className="poppins-font">Admin Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editableContent.name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="profile-data-text">{isEditing ? editableContent.name : profileData.name}</p>
                  )}
                </div>
                <div className="input-text">
                  <label className="poppins-font">Company Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={editableContent.companyName}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="profile-data-text">
                      {profileData.companyName}
                    </p>
                  )}
                </div>
                <div className="input-text">
                  <label className="poppins-font">Company Phone Number:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyPhoneNumber"
                      value={editableContent.companyPhoneNumber}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="profile-data-text">
                      {profileData.companyPhoneNumber}
                    </p>
                  )}
                </div>
                <div className="input-text">
                  <label className="poppins-font">Company Address:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editableContent.address}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="profile-data-text">{profileData.address}</p>
                  )}
                </div>
              </div>
              {/* company pic */}
              <div
                className={`profile-picture-container-right ${
                  isEditing ? "editing" : ""
                }`}
              >
                <label htmlFor="profilePicture" className="company-pic">
                  <img
                    src={profileData.profilePicture}
                    alt="Profile"
                    className={`company-picture ${isEditing ? "editing" : ""}`}
                    onClick={handleProfilePictureClick}
                  />
                </label>
                {isEditing && (
                  <input
                    type="file"
                    id="profilePictureInput"
                    name="profilePicture"
                    onChange={handleInputChange}
                    style={{ display: "none" }}
                  />
                )}
              </div>
            </div>
            {/* buttons */}
            <div className="profile-buttons">
              {isEditing ? (
                <div className="profile-edit-buttons">
                  <button className="save-button" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button className="cancel-button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="edit-button" onClick={handleEditClick}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
