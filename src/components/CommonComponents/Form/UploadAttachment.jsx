import React, { useContext } from "react";
import "../../../assets/styles/Upload.scss";
import downloadIcon from "../../../assets/images/downloadIcon.png";
import { FormContext } from "../../Context/FormContext";
import { Form } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../Config/HelperUtils";

const UploadAttachment = ({ name, label = "Upload Attachment", errors }) => {
  const { handleFiles } = useContext(FormContext);

  const handleFileName = (e) => {
    e.preventDefault();
    document.getElementById(name).innerHTML = e.target.files[0].name;
    handleFiles(e);
  };

  return (
    <>
      <div
        className={
          errors && Object.keys(errors).length > 0 && errors[name]
            ? "fileUpload btn btn-orange file-upload-error"
            : "fileUpload btn btn-orange"
        }
        key={name}
      >
        <img src={downloadIcon} className="icon" alt="img" />
        <span className="uploadDescription" id={name}>
          {label}
        </span>
        <input
          type="file"
          className="upload up"
          name={name}
          id="up"
          onChange={handleFileName}
        />
      </div>
      {errors && Object.keys(errors).length > 0 && errors[name] && (
        <Form.Control.Feedback type="invalid">
          {capitalizeFirstLetter(errors[name])}
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default UploadAttachment;
