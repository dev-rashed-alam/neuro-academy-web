import React, {useContext} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";
import {Button} from "../../CommonComponents/Button";
import UploadComponent from "../../CommonComponents/Form/UploadComponent";
import {FormContext} from "../../Context/FormContext";
import {fetchYoutubePlaylist} from "../../Config/ApiHandler";

const optionForModule = [
    {value: "Web Design", label: "Web Design"},
    {value: "Web Development", label: "Web Development"},
    {value: "Graphics Design", label: "Graphics Design"},
];
const optionForCourseUpload = [
    {value: "youtube", label: "Youtube Link"},
    {value: "custom", label: "Custom Upload"}
];

const CourseForm = (props) => {

    const {videos, addDynamicVideos, inputData, addNewYoutubeVideos,youtubeVideos} = useContext(FormContext);

    const renderDynamicAttachmentForVideos = () => {
        return videos.map(item =>
            <div className="pt-1 pb-1">
                <UploadComponent
                    identifier={item}
                />
            </div>
        )
    }

    const handleSubmit = () => {
        props.triggerModal();
    };

    const handleYoutubePlaylist = (pageToken) => {
        let youtubeVideos = [];
        fetchYoutubePlaylist(inputData["playlistId"], pageToken)
            .then((response) => {
                response.items.map((item) => {
                    youtubeVideos.push(item.snippet)
                })
                addNewYoutubeVideos(youtubeVideos)
                if ("nextPageToken" in response) {
                    handleYoutubePlaylist(response.nextPageToken)
                }
            })
            .catch(e => console.log(e))
    }

    const renderCustomVideoUpload = () => {
        if (inputData["courseUploadType"] !== undefined && inputData["courseUploadType"] === "custom") {
            return (
                <Row>
                    <Col>
                        <Button
                            name="Add Videos"
                            className="btn btn-primary"
                            onClickEvent={addDynamicVideos}
                        />
                    </Col>
                </Row>
            )
        } else if (inputData["courseUploadType"] !== undefined && inputData["courseUploadType"] === "youtube") {
            return (
                <Row className="align-items-center">
                    <Col>
                        <TextComponent
                            label="Youtube Playlist ID"
                            placeHolder="Enter Playlist ID"
                            name="playlistId"
                            required={false}
                            type="text"
                            controlId="play_list_id"
                            handleBlur={() => handleYoutubePlaylist(undefined)}
                        />
                    </Col>
                    <Col>
                        <TextComponent
                            label="Total Videos"
                            placeHolder="Total Videos"
                            name="totalVideos"
                            required={false}
                            readOnly={true}
                            value={youtubeVideos.length}
                            type="text"
                            controlId="total_videos"
                        />
                    </Col>
                </Row>
            )
        }
    }

    return (
        <ModalComponent
            show={props.modalShow}
            onHide={props.triggerModal}
            size="xl"
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
            {renderDynamicAttachmentForVideos()}
            {renderCustomVideoUpload()}
            <Row>
                <Col>
                    <EditorComponent
                        name="courseFeature"
                        controlId="course_feature"
                        label="Add Course Feature"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="shortDescription"
                        controlId="short_description"
                        label="Add Short Description"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="longDescription"
                        controlId="long_description"
                        label="Add Long Description"
                    />
                </Col>
            </Row>
        </ModalComponent>
    );
}

export default CourseForm
