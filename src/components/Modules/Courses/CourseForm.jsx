import React, {useContext} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";
import {Button} from "../../CommonComponents/Button";
import UploadComponent from "../../CommonComponents/Form/UploadComponent";
import {FormContext} from "../../Context/FormContext";
import {apiUrl, fetchYoutubePlaylist, postMethod} from "../../Config/ApiHandler";
import {printApiErrors} from "../../Config/HelperUtils";

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

    const {
        setLoader,
        videos,
        addDynamicVideos,
        inputData,
        addNewYoutubeVideos,
        youtubeVideos,
        tutorials
    } = useContext(FormContext);

    const renderDynamicAttachmentForVideos = () => {
        if (inputData["type"]?.value === "custom") {
            return videos.map(item =>
                <div className="pt-1 pb-1">
                    <UploadComponent
                        identifier={item}
                    />
                </div>
            )
        }
    }

    const handleSubmit = async () => {
        let postData = {...inputData};
        postData["type"] = inputData.type.value;
        postData["shortTitle"] = inputData.title;
        postData["customVideos"] = [...tutorials];
        postData["youtubeVideos"] = [...youtubeVideos];
        setLoader(true)
        await postMethod(apiUrl.courseStore, postData).then(async () => {
            setLoader(false);
            handleClose()
        }).catch((error) => {
            setLoader(false);
            printApiErrors(error)
        })
    };

    const handleClose = () => {
        props.triggerModal();
    };

    const handleYoutubePlaylist = (pageToken) => {
        let tmpYoutubeVideos = [];
        fetchYoutubePlaylist(inputData["playlistId"], pageToken)
            .then((response) => {
                response.items.map((item) => {
                    tmpYoutubeVideos.push(item.snippet)
                })
                addNewYoutubeVideos(tmpYoutubeVideos)
                if ("nextPageToken" in response) {
                    handleYoutubePlaylist(response.nextPageToken)
                }
            })
            .catch(e => console.log(e))
    }

    const renderCustomVideoUpload = () => {
        if (inputData["type"]?.value === "custom") {
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
        } else if (inputData["type"]?.value === "youtube") {
            return (
                <Row className="align-items-center">
                    <Col>
                        <TextComponent
                            label="Youtube Playlist ID"
                            placeHolder="Enter Playlist ID"
                            name="playlistId"
                            value={inputData.playlistId}
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
                    action: handleClose,
                    className: "btn btn-danger",
                },
            ]}
        >
            <Row className="align-items-center">
                <Col>
                    <TextComponent
                        label="Course Title"
                        placeHolder="Enter Course Title"
                        name="title"
                        required={false}
                        value={inputData.title}
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
                        value={inputData.instructorName}
                        type="text"
                        controlId="instructor_name"
                    />
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col>
                    <TextComponent
                        label="Course Price"
                        placeHolder="Enter Course Price"
                        name="price"
                        required={false}
                        value={inputData.price}
                        type="text"
                        controlId="course_price"
                    />
                </Col>
                <Col>
                    <TextComponent
                        label="Course Duration"
                        placeHolder="Enter Course Duration"
                        name="duration"
                        required={false}
                        value={inputData.duration}
                        type="text"
                        controlId="course_duration"
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
                        value={inputData.category}
                        name="category"
                    />
                </Col>
                <Col>
                    <SelectComponent
                        label="Select Course Upload Type"
                        placeholder="Select Course Upload Type"
                        multiple={false}
                        options={optionForCourseUpload}
                        value={inputData.type}
                        name="type"
                    />
                </Col>
            </Row>
            {renderDynamicAttachmentForVideos()}
            {renderCustomVideoUpload()}
            <Row>
                <Col>
                    <EditorComponent
                        name="requirements"
                        controlId="course_requirements"
                        label="Add Course Requirements"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="features"
                        controlId="course_features"
                        label="Add Course Features"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="description"
                        controlId="course_description"
                        label="Add Course Description"
                    />
                </Col>
            </Row>
        </ModalComponent>
    );
}

export default CourseForm
