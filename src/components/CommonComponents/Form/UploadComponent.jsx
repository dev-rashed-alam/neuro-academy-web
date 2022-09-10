import React, {useContext, useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Button} from "../Button";
import "../../../assets/styles/Form.scss";
import Select from "react-select";
import FileComponent from "./FileComponent";
import {FormContext} from "../../Context/FormContext";

const customStyles = {
    menu: (base) => ({
        ...base,
        marginTop: "2px",
    }),
    option: (base) => ({
        padding: "8px 12px",
        "&:hover": {
            backgroundColor: "#000000 !important",
        },
    }),
};

const options = [
    {value: "1", label: "#1"},
    {value: "2", label: "#2"},
    {value: "3", label: "#3"},
    {value: "4", label: "#4"},
    {value: "5", label: "#5"},
    {value: "6", label: "#6"},
    {value: "7", label: "#7"},
    {value: "8", label: "#8"},
    {value: "9", label: "#9"},
    {value: "10", label: "#10"},
    {value: "11", label: "#11"},
    {value: "12", label: "#12"},
    {value: "13", label: "#13"},
    {value: "14", label: "#14"},
    {value: "15", label: "#15"},
]
const UploadComponent = ({identifier}) => {

    const [videoTitle, setVideoTitle] = useState(null);

    const {addNewTutorial, findTutorialById, removeTutorial} = useContext(FormContext)

    const renderFileName = () => {
        let attachment = findTutorialById(identifier);
        if (attachment === undefined) {
            return `Upload Attachment ${identifier}`
        } else {
            return attachment.video.name
        }
    }

    const addVideoSerial = (serial) => {
        let attachment = findTutorialById(identifier);
        if (attachment !== undefined) {
            addNewTutorial(identifier, attachment.video, serial.value,attachment.title)
        }
    }

    const handleVideoTitle = (e) => {
        setVideoTitle(e.target.value)
    }

    const addTitle = (event) => {
        event.preventDefault();
        let attachment = findTutorialById(identifier);
        if (attachment !== undefined) {
            addNewTutorial(identifier, attachment.video, attachment.serial, videoTitle)
        }
    }

    return (
        <Container key={`videos${identifier}`}>
            <Row>
                <Col md={4} className="pl-0">
                    <FileComponent identifier={identifier} addVideo={addNewTutorial} fileName={renderFileName}/>
                </Col>
                <Col md={3}>
                    <Select
                        styles={customStyles}
                        options={options}
                        placeholder="Select Serial"
                        className="basic-single"
                        classNamePrefix="select"
                        name={`serial${identifier}`}
                        onChange={(val) => addVideoSerial(val)}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        className="form-style"
                        type="text"
                        placeholder="Enter Title"
                        name={`name${identifier}`}
                        onChange={handleVideoTitle}
                        onBlur={addTitle}
                    />
                </Col>
                <Col md={1}>
                    <Button
                        name="Remove"
                        className="btn btn-danger"
                        onClickEvent={() => removeTutorial(identifier)}
                    />
                </Col>
            </Row>
        </Container>
    )
};

export default UploadComponent