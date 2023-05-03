import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../../assets/styles/Profile.scss";
import {
  fetchUserInfoById,
  updateProfileById,
} from "../../../services/Profile";
import {getUserId, removeUserSession} from "../../Config/SessionUtils";
import {
  capitalizeFirstLetter,
  filterPostData,
  getErrorMessages
} from "../../Config/HelperUtils";
import { FormContext } from "../../Context/FormContext";
import { Button } from "../../CommonComponents/Button";
import ProfileImage from "../../../assets/images/profile.jpeg";
import { adminProfile } from "../../../validations/ValidationSchema";

const Profile = () => {
  const { setLoader } = useContext(FormContext);
  const [errors, setErrors] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const uploadProfilePic = (evt) => {
    evt.preventDefault();
    const { files } = evt.target;
    const formData = new FormData();
    formData.append("myFile", files[0], files[0].name);
    setProfileImg(files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name) {
      setInputData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const fetchUserInfo = async () => {
    setLoader(true);
    const data = await fetchUserInfoById(getUserId())
    setInputData((prev) => ({ ...prev, ...data }));
    setLoader(false);
  }

  useEffect(() => {
    fetchUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileUpdate = async () => {
    let postData = { ...inputData };
    if(profileImg){
      postData["avatar"] = profileImg;
    }
    adminProfile
      .validate(filterPostData(postData), { abortEarly: false })
      .then(async () => {
        setLoader(true);
        await updateProfileById(getUserId(), postData)
        await removeUserSession();
        setLoader(false)
      })
      .catch(function (err) {
        setErrors(getErrorMessages(err));
      });
  };

  const getProfilePic = () => {
    if (profileImg !== null) return URL.createObjectURL(profileImg);
    if (inputData.avatar) return inputData.avatar;
    return ProfileImage;
  };

  return (
    <div className="profile-body">
      <Row>
        <Col>
          <div className="profile-pic">
            <label className="-label" htmlFor="file">
              <span className="text-img">Change Image</span>
            </label>
            <input
              id="file"
              type="file"
              name="image"
              onChange={uploadProfilePic}
            />
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              id="output"
              width="200"
              alt="profile-image"
              src={getProfilePic()}
            />
            <div className="user-info">
              <p>Email Address</p>
              <p>{inputData?.email}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="field-wrapper mt-4">
          <label htmlFor="firstName" className="col-form-label">
            First Name
          </label>
          <div className="input">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={inputData.firstName || ""}
              className={
                errors && Object.keys(errors).length > 0 && errors["firstName"]
                  ? "form-control field-error"
                  : "form-control"
              }
              onChange={handleChange}
            />
            {errors &&
              Object.keys(errors).length > 0 &&
              errors["firstName"] && (
                <div className="invalid-feedback">
                  {capitalizeFirstLetter(errors["firstName"])}
                </div>
              )}
          </div>
        </div>
      </Row>
      <Row>
        <div className="field-wrapper">
          <label htmlFor="lastName">Last Name</label>
          <div className="input">
            <input
              type="text"
              name="lastName"
              value={inputData.lastName || ""}
              id="lastName"
              className={
                errors && Object.keys(errors).length > 0 && errors["lastName"]
                  ? "form-control field-error"
                  : "form-control"
              }
              onChange={handleChange}
            />
            {errors &&
              Object.keys(errors).length > 0 &&
              errors["lastName"] && (
                <div className="invalid-feedback">
                  {capitalizeFirstLetter(errors["lastName"])}
                </div>
              )}
          </div>
        </div>
      </Row>
      <Row>
        <div className="field-wrapper">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <div className="input">
            <input
              type="text"
              id="mobileNumber"
              name="phoneNumber"
              value={inputData.phoneNumber || ""}
              className={
                errors && Object.keys(errors).length > 0 && errors["phoneNumber"]
                  ? "form-control field-error"
                  : "form-control"
              }
              onChange={handleChange}
            />
            {errors && Object.keys(errors).length > 0 && errors["phoneNumber"] && (
              <div className="invalid-feedback">
                {capitalizeFirstLetter(errors["phoneNumber"])}
              </div>
            )}
          </div>
        </div>
      </Row>
      <Row>
        <div className="field-wrapper">
          <label htmlFor="password">New Password</label>
          <div className="input">
            <input
              type="password"
              name="password"
              id="password"
              className={
                errors && Object.keys(errors).length > 0 && errors["password"]
                  ? "form-control field-error"
                  : "form-control"
              }
              value={inputData.password || ""}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors && Object.keys(errors).length > 0 && errors["password"] && (
              <div className="invalid-feedback">
                {capitalizeFirstLetter(errors["password"])}
              </div>
            )}
          </div>
        </div>
      </Row>
      <Row>
        <div className="field-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={inputData.confirmPassword || ""}
              onChange={handleChange}
              className={
                errors &&
                Object.keys(errors).length > 0 &&
                errors["confirmPassword"]
                  ? "form-control field-error"
                  : "form-control"
              }
            />
            {errors &&
              Object.keys(errors).length > 0 &&
              errors["confirmPassword"] && (
                <div className="invalid-feedback">
                  {capitalizeFirstLetter(errors["confirmPassword"])}
                </div>
              )}
          </div>
        </div>
      </Row>
      <Row>
        <Button
          name={"Update Profile"}
          className="btn btn-primary"
          onClickEvent={handleProfileUpdate}
        />
      </Row>
    </div>
  );
};

export default Profile;
