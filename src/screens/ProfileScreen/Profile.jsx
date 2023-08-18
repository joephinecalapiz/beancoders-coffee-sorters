/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/Sidebar.css";
import "../.././css/dashboard.css";
import "../.././css/profile.css";

const Profile = () => {
  const [navVisible, showNavbar] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    profilePicture: "assets/beansLogo.png",
    name: "Joephine Calapiz",
    companyPhoneNumber: "9518052760",
    address: "123 Main St, City",
    companyName: "ABC Corporation",
  });

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    document.title = "Profile";

    // Add this code to control the body's overflow
    if (navVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navVisible]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // Here you can perform an API call to update the profile data
    // and then update the profileData state accordingly
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePictureClick = () => {
    // Here you can trigger a file input click programmatically
    document.getElementById("profilePictureInput").click();
  };

  return (
    <>
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className={`App ${navVisible ? "content-shift-right" : ""}`}>
        <div
          className={`p-10 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
          }}
        >
          <h1 className="text-black profile-title">Profile Settings</h1>

          {isEditing ? (
            <div>
              <div className="profile-section">
                <label
                  htmlFor="profilePicture"
                  className="profile-picture-label"
                >
                  <img
                    src={profileData.profilePicture}
                    alt="Profile"
                    className="profile-picture"
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
              <div>
                <label>Admin Name: </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={profileData.name}
                />
              </div>
              <div>
                <label>Company Name: </label>
                <input
                  type="text"
                  name="companyName"
                  onChange={handleInputChange}
                  value={profileData.companyName}
                />
              </div>
              <div>
                <label>Company Phone Number: </label>
                <input
                  type="tel"
                  name="companyPhoneNumber"
                  onChange={handleInputChange}
                  value={profileData.companyPhoneNumber}
                />
              </div>
              <div>
                <label>Company Address: </label>
                <input
                  type="text"
                  name="address"
                  onChange={handleInputChange}
                  value={profileData.address}
                />
              </div>

              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <div>
              <div>
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="circular-profile"
                />
              </div>
              <div>
                <label>Admin Name: </label> {profileData.name}
              </div>
              <div>
                <label>Company Name:</label> {profileData.companyName}
              </div>
              <div>
                <label>Company Phone Number: </label>{" "}
                {profileData.companyPhoneNumber}
              </div>
              <div>
                <label>Company Address: </label> {profileData.address}
              </div>

              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
