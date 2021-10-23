import React from "react";
import "../../../assets/styles/Upload.scss"
import {Col, Container, Form, Row} from "react-bootstrap";
import {Button} from "../Button";

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
                            className="upl"
                            id="upload">
                            Upload Attachment
                        </span>
                        <input type="file" className="upload up" id="up" onChange={handleFileName}/>
                    </div>
                </Col>
                <Col md={7}>
                    <Form.Control
                        className="form-style"
                        type="text"
                        placeholder="Enter File Name"
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