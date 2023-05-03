import React, { useContext, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button } from "../Button";
import "../../../assets/styles/Form.scss";
import FileComponent from "./FileComponent";
import { FormContext } from "../../Context/FormContext";

const UploadComponent = ({ identifier }) => {
  const [videoTitle, setVideoTitle] = useState(null);
  const [videoDescription, setVideoDescription] = useState(null);

  const { addNewTutorial, findTutorialById, removeTutorial } =
    useContext(FormContext);

  const renderFileName = () => {
    let attachment = findTutorialById(identifier);
    if (attachment === undefined) {
      return `Upload Course Video`;
    } else {
      return attachment.video.name;
    }
  };

  const handleVideoTitle = (e) => {
    setVideoTitle(e.target.value);
  };

  const handleVideoDescription = (e) => {
    setVideoDescription(e.target.value);
  };

  const addTitleOrDescription = (event) => {
    event.preventDefault();
    let attachment = findTutorialById(identifier);
    if (attachment !== undefined) {
      addNewTutorial(
        identifier,
        attachment.video,
        videoDescription,
        videoTitle
      );
    }
  };

  return (
    <Container key={`videos${identifier}`}>
      <Row>
        <Col md={4} className="pl-0">
          <FileComponent
            identifier={identifier}
            addVideo={addNewTutorial}
            fileName={renderFileName}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            className="form-style"
            type="text"
            placeholder="Enter Title"
            name={`name${identifier}`}
            onChange={handleVideoTitle}
            onBlur={addTitleOrDescription}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            className="form-style"
            type="text"
            placeholder="Enter Description"
            name={`description${identifier}`}
            onChange={handleVideoDescription}
            onBlur={addTitleOrDescription}
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
  );
};

export default UploadComponent;
