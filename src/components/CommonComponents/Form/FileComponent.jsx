import React from "react";
import "../../../assets/styles/Upload.scss";
import {isValidFileType, mapFileTypes} from "../../Config/HelperUtils";
import {toast} from "react-toastify";

const FileComponent = ({identifier, addFile, fileName, findFile, accept = "*/*"}) => {

    const handleFileName = (e) => {
        e.preventDefault();
        if (!isValidFileType(['image/jpeg', 'image/png', 'text/plain', 'application/pdf'], e.target.files[0].type)) {
            toast.warning(`Only ${mapFileTypes(accept)} allowed!`)
            return;
        }
        if (addFile === undefined) {
            document.getElementById(`upload${identifier}`).innerHTML =
                e.target.files[0].name;
        } else {
            let attachment = findFile(identifier);
            if (attachment !== undefined) {
                addFile(
                    identifier,
                    e.target.files[0],
                    attachment.serial,
                    attachment.title
                );
            } else {
                addFile(identifier, e.target.files[0]);
            }
        }
    };

    return (
        <div className="fileUpload btn btn-orange" key={`attachment${identifier}`}>
            <img src="/upload.png" className="icon" alt="img"/>
            <span className="uploadDescription" id={`upload${identifier}`}>
                {fileName()}
            </span>
            <input
                type="file"
                className="upload up"
                name={`attachment${identifier}`}
                id="up"
                onChange={handleFileName}
                accept={accept}
            />
        </div>
    );
};

export default FileComponent;
