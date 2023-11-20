import React, {useContext, useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Button} from "../Button";
import "../../../assets/styles/Form.scss";
import FileComponent from "./FileComponent";
import {FormContext} from "../../Context/FormContext";

const CourseAttachmentUploadComponent = ({identifier, errors}) => {
    const [fileTitle, setFileTitle] = useState(null);
    const [fileDescription, setFileDescription] = useState(null);

    const {addNewAttachment, findAttachmentById, removeAttachment} =
        useContext(FormContext);

    const renderFileName = () => {
        let attachment = findAttachmentById(identifier);
        if (attachment === undefined) {
            return `Upload Attachment`;
        } else {
            return attachment.file.name;
        }
    };

    const handleFileTitle = (e) => {
        setFileTitle(e.target.value);
    };

    const handleFileDescription = (e) => {
        setFileDescription(e.target.value);
    };

    const addTitleOrDescription = (event) => {
        event.preventDefault();
        let attachment = findAttachmentById(identifier);
        if (attachment !== undefined) {
            addNewAttachment(
                identifier,
                attachment.file,
                fileDescription,
                fileTitle
            );
        }
    };

    return (
        <Container key={`attachments${identifier}`}>
            <Row>
                <Col md={4} className="pl-0">
                    <FileComponent
                        error={!!errors?.[`attachment_${identifier}`]}
                        identifier={identifier}
                        addFile={addNewAttachment}
                        fileName={renderFileName}
                        findFile={findAttachmentById}
                        accept={'image/*, text/*, application/pdf'}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        className={(`title_${identifier}` in errors) ? 'field-error form-style' : 'form-style'}
                        type="text"
                        placeholder="Enter Title"
                        name={`name${identifier}`}
                        onChange={handleFileTitle}
                        onBlur={addTitleOrDescription}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        className="form-style"
                        type="text"
                        placeholder="Enter Description"
                        name={`description${identifier}`}
                        onChange={handleFileDescription}
                        onBlur={addTitleOrDescription}
                    />
                </Col>
                <Col md={1}>
                    <Button
                        name="Remove"
                        className="btn btn-danger"
                        onClickEvent={() => removeAttachment(identifier)}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CourseAttachmentUploadComponent;
