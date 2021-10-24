import React from "react";
import "../../../assets/styles/Upload.scss"
import {Col, Container, Form, Row} from "react-bootstrap";
import {Button} from "../Button";
import "../../../assets/styles/Form.scss";
import Select from "react-select";
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
    {value: "1", label: "Serial 1"},
    {value: "2", label: "Serial 2"},
    {value: "3", label: "Serial 3"},
]

const UploadComponent = () => {

    const handleFileName = (e) => {
        e.preventDefault()
        document.getElementById("upload").innerHTML = e.target.files[0].name
    }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <div className="fileUpload btn btn-orange">
                        <img
                            src="https://image.flaticon.com/icons/svg/136/136549.svg"
                            className="icon"
                            alt="img"
                        />
                        <span
                            className="uploadDescription"
                            id="upload">
                            Upload Attachment
                        </span>
                        <input type="file" className="upload up" id="up" onChange={handleFileName}/>
                    </div>
                </Col>
                <Col md={3}>
                    <Select
                        styles={customStyles}
                        options={options}
                        placeholder="Select Serial"
                        className="basic-single"
                        classNamePrefix="select"
                        name="selectSerial"
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        className="form-style"
                        type="text"
                        placeholder="Enter Title"
                        name="name"
                    />
                </Col>
                <Col md={1}>
                    <Button
                        name="Delete"
                        className="btn btn-primary"
                    />
                </Col>
            </Row>
        </Container>
    )
};

export default UploadComponent