import React from "react";
import "../../../assets/styles/Upload.scss"

const FileComponent = ({identifier}) => {

    const handleFileName = (e) => {
        e.preventDefault()
        document.getElementById(`upload${identifier}`).innerHTML = e.target.files[0].name;
    }

    return (
        <div className="fileUpload btn btn-orange" key={`attachment${identifier}`}>
            <img
                src="https://image.flaticon.com/icons/svg/136/136549.svg"
                className="icon"
                alt="img"
            />
            <span
                className="uploadDescription"
                id={`upload${identifier}`}>
                Upload Attachment {identifier}
            </span>
            <input type="file" className="upload up" name={`attachment${identifier}`} id="up"
                   onChange={handleFileName}/>
        </div>
    )
};

export default FileComponent