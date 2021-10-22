import React from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";

const optionForModule = [
    {value: "Web Design", label: "Web Design"},
    {value: "Web Development", label: "Web Development"},
    {value: "Graphics Design", label: "Graphics Design"},
];
const optionForCourseUpload = [
    {value: "Youtube link", label: "Youtube Link"},
    {value: "custom", label: "Custom Upload"}
];

const CourseForm = (props) => {

    const handleSubmit = () => {
        props.triggerModal();
    };

    return (
        <ModalComponent
            show={props.modalShow}
            onHide={props.triggerModal}
            size="lg"
            title="Add New Course"
            scrollable={false}
            showCloseButton={true}
            buttons={[
                {
                    name: "Submit",
                    action: handleSubmit,
                    className: "btn btn-primary",
                },
                {
                    name: "Close",
                    action: handleSubmit,
                    className: "btn btn-danger",
                },
            ]}
        >
            <Row className="align-items-center">
                <Col>
                    <TextComponent
                        label="Course Title"
                        placeHolder="Enter Course Title"
                        name="courseTitle"
                        required={false}
                        type="text"
                        controlId="course_title"
                    />
                </Col>
                <Col>
                    <TextComponent
                        label="Instructor Name"
                        placeHolder="Enter Instructor Name"
                        name="instructorName"
                        required={false}
                        type="text"
                        controlId="instructor_name"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SelectComponent
                        label="Select Category"
                        placeholder="Select Category"
                        multiple={true}
                        options={optionForModule}
                        name="category"
                    />
                </Col>
                <Col>
                    <SelectComponent
                        label="Select Course Upload Type"
                        placeholder="Select Course Upload Type"
                        multiple={false}
                        options={optionForCourseUpload}
                        name="courseUploadType"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent name="courseFeature"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent name="shortDescription"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent name="longDescription"/>
                </Col>
            </Row>
        </ModalComponent>
    );
}

export default CourseForm
