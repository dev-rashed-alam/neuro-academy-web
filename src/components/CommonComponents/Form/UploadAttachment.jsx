import React from "react";
import "../../../assets/styles/Upload.scss";
import downloadIcon from "../../../assets/images/downloadIcon.png";

const UploadAttachment = ({ fileName, name, label = "Upload Attachment" }) => {
  const handleFileName = (e) => {
    e.preventDefault();
    document.getElementById(`upload_${name}`).innerHTML =
      e.target.files[0].name;
  };

  return (
    <div className="fileUpload btn btn-orange" key={`attachment_${name}`}>
      <img src={downloadIcon} className="icon" alt="img" />
      <span className="uploadDescription" id={`upload_${name}`}>
        {label}
      </span>
      <input
        type="file"
        className="upload up"
        name={`attachment_${name}`}
        id="up"
        onChange={handleFileName}
      />
    </div>
  );
};

export default UploadAttachment;
