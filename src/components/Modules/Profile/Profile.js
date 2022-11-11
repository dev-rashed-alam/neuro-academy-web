import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../../assets/styles/Profile.scss";
import {
  fetchUserInfoById,
  signOut,
  updateProfileById,
} from "../../../services/Profile";
import { getUserId } from "../../Config/SessionUtils";
import {
  capitalizeFirstLetter,
  filterPostData,
  getErrorMessages,
  printApiErrors,
} from "../../Config/HelperUtils";
import { FormContext } from "../../Context/FormContext";
import { Button } from "../../CommonComponents/Button";
import ProfileImage from "../../../assets/images/profile.jpeg";
import { useHistory } from "react-router-dom";
import { adminProfile } from "../../../validations/ValidationSchema";

const Profile = () => {
  const { setLoader } = useContext(FormContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    password: "",
    confirm_password: "",
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

  useEffect(() => {
    setLoader(true);
    fetchUserInfoById(getUserId())
      .then(({ data }) => {
        setInputData((prev) => ({ ...prev, ...data.data }));
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        printApiErrors(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileUpdate = async () => {
    let postData = { ...inputData };
    postData["image"] = profileImg;
    adminProfile
      .validate(filterPostData(postData), { abortEarly: false })
      .then(async () => {
        setLoader(true);
        await updateProfileById(getUserId(), postData)
          .then(async (response) => {
            await signOut(setLoader, history);
          })
          .catch((error) => {
            setLoader(false);
            printApiErrors(error);
          });
      })
      .catch(function (err) {
        setErrors(getErrorMessages(err));
      });
  };
  const getProfilePic = () => {
    if (profileImg !== null) return URL.createObjectURL(profileImg);
    if (inputData.image) return inputData.image;
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
              name="first_name"
              value={inputData.first_name}
              className={
                errors && Object.keys(errors).length > 0 && errors["first_name"]
                  ? "form-control field-error"
                  : "form-control"
              }
              onChange={handleChange}
            />
            {errors &&
              Object.keys(errors).length > 0 &&
              errors["first_name"] && (
                <div className="invalid-feedback">
                  {capitalizeFirstLetter(errors["first_name"])}
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
              name="last_name"
              value={inputData.last_name}
              id="lastName"
              className={
                errors && Object.keys(errors).length > 0 && errors["last_name"]
                  ? "form-control field-error"
                  : "form-control"
              }
              onChange={handleChange}
            />
            {errors &&
              Object.keys(errors).length > 0 &&
              errors["last_name"] && (
                <div className="invalid-feedback">
                  {capitalizeFirstLetter(errors["last_name"])}
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
              name="phone_no"
              value={inputData.phone_no}
              className={
                errors && Object.keys(errors).length > 0 && errors["phone_no"]
                  ? "form-control field-error"
                  : "form-control"
              }
              onChange={handleChange}
            />
            {errors && Object.keys(errors).length > 0 && errors["phone_no"] && (
              <div className="invalid-feedback">
                {capitalizeFirstLetter(errors["phone_no"])}
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
              value={inputData.password}
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
              name="confirm_password"
              value={inputData.confirm_password}
              onChange={handleChange}
              className={
                errors &&
                Object.keys(errors).length > 0 &&
                errors["confirm_password"]
                  ? "form-control field-error"
                  : "form-control"
              }
            />
            {errors &&
              Object.keys(errors).length > 0 &&
              errors["confirm_password"] && (
                <div className="invalid-feedback">
                  {capitalizeFirstLetter(errors["confirm_password"])}
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
