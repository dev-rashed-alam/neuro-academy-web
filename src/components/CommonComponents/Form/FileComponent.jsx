import React, {useContext} from "react";
import "../../../assets/styles/Upload.scss"
import {FormContext} from "../../Context/FormContext";
const FileComponent = ({identifier, addVideo, fileName}) => {

    const {findTutorialById} = useContext(FormContext)

    const handleFileName = (e) => {
        e.preventDefault()

        if (addVideo === undefined) {
            document.getElementById(`upload${identifier}`).innerHTML = e.target.files[0].name;
        } else {
            let attachment = findTutorialById(identifier);
            if (attachment !== undefined) {
                addVideo(identifier, e.target.files[0], attachment.serial, attachment.title)
            } else {
                addVideo(identifier, e.target.files[0])
            }
        }
    }

    return (
        <div className="fileUpload btn btn-orange" key={`attachment${identifier}`}>
            <img
                src="/upload.png"
                className="icon"
                alt="img"
            />
            <span
                className="uploadDescription"
                id={`upload${identifier}`}>
                {fileName()}
            </span>
            <input type="file" className="upload up" name={`attachment${identifier}`} id="up"
                   onChange={handleFileName}/>
        </div>
    )
};

export default FileComponent