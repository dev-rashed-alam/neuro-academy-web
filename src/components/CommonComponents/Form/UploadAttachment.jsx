import React, { useContext } from "react";
import "../../../assets/styles/Upload.scss";
import downloadIcon from "../../../assets/images/downloadIcon.png";
import { FormContext } from "../../Context/FormContext";

const UploadAttachment = ({ name, label = "Upload Attachment" }) => {
  const { handleFiles } = useContext(FormContext);

  const handleFileName = (e) => {
    e.preventDefault();
    document.getElementById(name).innerHTML = e.target.files[0].name;
    handleFiles(e);
  };

  return (
    <div className="fileUpload btn btn-orange" key={name}>
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
  );
};

export default UploadAttachment;
