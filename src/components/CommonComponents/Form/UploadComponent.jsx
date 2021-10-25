import React from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Button} from "../Button";
import "../../../assets/styles/Form.scss";
import Select from "react-select";
import FileComponent from "./FileComponent";

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
]
const UploadComponent = ({identifier, clickHandler}) => {

    return (
        <Container key={`videos${identifier}`}>
            <Row>
                <Col md={4} className="pl-0">
                    <FileComponent identifier={identifier}/>
                </Col>
                <Col md={3}>
                    <Select
                        styles={customStyles}
                        options={options}
                        placeholder="Select Serial"
                        className="basic-single"
                        classNamePrefix="select"
                        name={`serial${identifier}`}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        className="form-style"
                        type="text"
                        placeholder="Enter Title"
                        name={`name${identifier}`}
                    />
                </Col>
                <Col md={1}>
                    <Button
                        name="Remove"
                        className="btn btn-danger"
                        onClickEvent={() => clickHandler(identifier)}
                    />
                </Col>
            </Row>
        </Container>
    )
};

export default UploadComponent