import React, {useContext, useEffect, useState} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Form, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";
import {Button} from "../../CommonComponents/Button";
import CourseCustomVideoUploadComponent from "../../CommonComponents/Form/CourseCustomVideoUploadComponent";
import {FormContext} from "../../Context/FormContext";
import {formatSecondsToDuration, getErrorMessages, isValidFileType} from "../../Config/HelperUtils";
import {toast} from "react-toastify";
import "../../../assets/styles/Course.scss";
import UploadAttachment from "../../CommonComponents/Form/UploadAttachment";
import {
    addCourse,
    fetchCourseById,
    fetchYoutubePlaylist,
    fetchYoutubeVideoDuration,
    updateCourseById
} from "../../../services/Course";
import {courseSchema} from "../../../validations/ValidationSchema";
import CustomVideoList from "./CustomVideoList";
import {findAllCategories} from "../../../services/Category";
import CourseAttachmentUploadComponent from "../../CommonComponents/Form/CourseAttachmentUploadComponent";
import CourseMaterialList from "./CourseMaterialList";

const optionForCourseUpload = [
    {value: "youtube", label: "Youtube Link"}
];

const CourseForm = ({
                        triggerModal,
                        modalShow,
                        fetchCourseList,
                        selectedCourse,
                    }) => {
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const {
        setLoader,
        videos,
        files,
        addDynamicVideos,
        addDynamicFiles,
        inputData,
        addNewYoutubeVideos,
        youtubeVideos,
        tutorials,
        attachments,
        setInputData,
        setYoutubeVideos,
        resetContext,
        setVideos,
        setFiles
    } = useContext(FormContext);

    useEffect(() => {
        if (selectedCourse) {
            setLoader(true);
            let tmpCategories = selectedCourse.categories.map((item) => ({
                value: item.id,
                label: item.name,
            }));

            fetchCourseById(selectedCourse.id).then((data) => {
                let postData = {
                    ...inputData,
                    courseRootPath: data?.courseRootPath?.toString(),
                    title: data.title,
                    shortTitle: data.shortTitle,
                    instructorName: data.instructorName,
                    coursePrice: data.coursePrice,
                    courseDuration: data.courseDuration,
                    courseRequirements: data.courseRequirements,
                    courseFeatures: data.courseFeatures,
                    courseDescription: data.courseDescription,
                    playlistId: data.playlistId || "",
                    type: optionForCourseUpload.find(
                        (item) => item.value === data.courseType
                    ),
                    category: tmpCategories,
                };
                if (data.courseType === "youtube") {
                    postData["totalVideos"] = data.youtubeVideos.length;
                    addNewYoutubeVideos(data.youtubeVideos)
                }
                setInputData(postData);
                setLoader(false);
            }).catch((error) => {
                setInputData({});
                setLoader(false);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCourse]);

    const fetchCategoryList = async () => {
        setLoader(true);
        const data = await findAllCategories()
        let resultSet = [];
        for (let item of data) {
            resultSet.push({value: item.id, label: item.name});
        }
        setCategories(resultSet);
        setLoader(false);
    };

    useEffect(() => {
        fetchCategoryList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderCustomVideos = () => {
        if (inputData["type"]?.value === "custom") {
            return videos.map(item => (
                <div className="pt-1 pb-1" key={`custom_upload_${item}`}>
                    <CourseCustomVideoUploadComponent identifier={item}/>
                </div>
            ));
        }
    };

    const renderUploadedAttachments = () => {
        if (inputData["type"]?.value) {
            return files.map(item => (
                <div className="pt-1 pb-1" key={`custom_upload_attachment_${item}`}>
                    <CourseAttachmentUploadComponent identifier={item}/>
                </div>
            ));
        }
    };

    const handleSubmit = () => {
        if (inputData?.thumbnail && !isValidFileType(['image/jpeg', 'image/png'], inputData?.thumbnail?.type)) {
            toast.warning('Only .jpg, .png, .jpeg allowed for thumbnail!')
            return;
        }
        let objForValidate = {
            ...inputData,
            isThumbnailExist: selectedCourse?.id ? !!selectedCourse.thumbnail : !!inputData.thumbnail
        }
        courseSchema
            .validate(objForValidate, {abortEarly: false})
            .then(async () => {
                setLoader(true);
                let postData = {...inputData, categoryId: inputData.category?.map(item => item.value)}
                delete postData.category
                delete postData.type
                if (selectedCourse?.id) await updateCourseById(postData, selectedCourse.id, youtubeVideos, tutorials, attachments)
                if (!selectedCourse?.id) await addCourse(postData, youtubeVideos, tutorials, attachments)
                await fetchCourseList();
                handleClose();
                setLoader(false);
            })
            .catch(function (err) {
                setLoader(false)
                setErrors(getErrorMessages(err));
            });
    };

    const handleClose = () => {
        setVideos([])
        setFiles([])
        setErrors({});
        resetContext();
        setYoutubeVideos([]);
        triggerModal();
    };

    useEffect(() => {
        setInputData((prev) => ({...prev, totalVideos: youtubeVideos.length}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [youtubeVideos]);

    const handleYoutubePlaylist = (pageToken) => {
        setLoader(true);
        let tmpYoutubeVideos = [];
        fetchYoutubePlaylist(inputData["playlistId"], pageToken)
            .then(async (response) => {
                response.items.forEach((item) => {
                    tmpYoutubeVideos.push({
                        thumbnail: item.snippet.thumbnails.default.url,
                        videoId: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        publishedAt: item.snippet.publishedAt,
                        length: 0,
                    });
                });
                addNewYoutubeVideos(tmpYoutubeVideos);
                let videoIds = tmpYoutubeVideos.map(item => item.videoId)
                const duration = await fetchYoutubeVideoDuration(videoIds)
                setInputData(prev => ({...prev, courseDuration : parseInt(prev.courseDuration || 0) + duration}))
                if ("nextPageToken" in response) {
                    handleYoutubePlaylist(response.nextPageToken);
                } else {
                    setLoader(false);
                }
            })
            .catch((error) => {
                if (error?.response?.data?.error)
                    toast.error(error.response.data.error.message);
                setLoader(false);
            });
    };

    const renderAttachmentUploadButton = () => {
        if ((files.length > 0 || inputData["type"]?.value === "youtube")) {
            return (
                <Row>
                    <Col>
                        <Button
                            name="Add Attachment"
                            className="btn btn-primary mt-2 mb-2"
                            onClickEvent={addDynamicFiles}
                        />
                    </Col>
                </Row>
            );
        }
    }

    const renderCourseUploadOptions = () => {
        if (inputData["type"]?.value === "custom") {
            return (
                <Row>
                    <Col>
                        <Button
                            name="Add Videos"
                            className="btn btn-primary mb-2"
                            onClickEvent={addDynamicVideos}
                        />
                        {files.length === 0 && <Button
                            name="Add Attachment"
                            className="btn btn-primary ml-2 mb-2"
                            onClickEvent={addDynamicFiles}
                        />}
                    </Col>
                </Row>
            );
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
                            errors={errors}
                            handleBlur={() => {
                                setInputData(prev => ({...prev, courseDuration: 0}))
                                setYoutubeVideos([]);
                                handleYoutubePlaylist(undefined);
                            }}
                        />
                    </Col>
                    <Col>
                        <TextComponent
                            label="Total Videos"
                            placeHolder="Total Videos"
                            name="totalVideos"
                            required={false}
                            readOnly={true}
                            value={inputData.totalVideos}
                            type="text"
                            controlId="total_videos"
                        />
                    </Col>
                </Row>
            );
        }
    };

    const renderYoutubeVideos = () => {
        if (inputData["type"]?.value === "youtube" && youtubeVideos?.length > 0) {
            return (
                <div className={`youtube-video-wrapper`}>
                    {youtubeVideos?.map((item, index) => {
                        return (
                            <Row
                                key={`youtube_videos_${index + 1}`}
                                className="align-items-center"
                            >
                                <Col>
                                    <div className="video-wrapper">
                                        <div className="video-thumb">
                                            <img
                                                src={item.thumbnail}
                                                alt="course-thumb"
                                                className="img-thumbnail"
                                            />
                                        </div>
                                        <div className="video-description">
                                            <p>Lecture Title: {item.title}</p>
                                            <p>Published Date: {item.publishedAt}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            )
        }
    };

    useEffect(() => {
        if (inputData.type !== undefined) {
            setInputData({
                ...inputData,
                courseType: inputData.type?.value,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputData.type]);

    useEffect(() => {
        return () => {
            resetContext()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ModalComponent
            show={modalShow}
            onHide={handleClose}
            size="xl"
            title={selectedCourse?.id ? "Update Course" : "Add New Course"}
            scrollable={false}
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
                        errors={errors}
                    />
                </Col>
                <Col>
                    <TextComponent
                        label="Short Title"
                        placeHolder="Enter Course Short Title"
                        name="shortTitle"
                        required={false}
                        value={inputData.shortTitle}
                        type="text"
                        controlId="course_short_title"
                        errors={errors}
                    />
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col>
                    <TextComponent
                        label="Instructor Name"
                        placeHolder="Enter Instructor Name"
                        name="instructorName"
                        required={false}
                        value={inputData.instructorName}
                        type="text"
                        controlId="instructor_name"
                        errors={errors}
                    />
                </Col>
                <Col>
                    <TextComponent
                        label="Course Price"
                        placeHolder="Enter Course Price"
                        name="coursePrice"
                        required={false}
                        value={inputData.coursePrice}
                        type="text"
                        controlId="course_price"
                        errors={errors}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SelectComponent
                        label="Select Category"
                        placeholder="Select Category"
                        multiple={true}
                        options={categories}
                        value={inputData.category}
                        name="category"
                        errors={errors}
                    />
                </Col>
                <Col>
                    <Form.Group controlId={"course_thumbnail"} key={`course_thumbnail`}>
                        <Form.Label>Upload Course Thumbnail</Form.Label>
                        <UploadAttachment name="thumbnail" errors={errors} accept="image/*"/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextComponent
                        label="Course Duration"
                        placeHolder="Enter Course Duration"
                        name="courseDuration"
                        required={false}
                        value={formatSecondsToDuration(inputData.courseDuration)}
                        type="text"
                        controlId="course_duration"
                        errors={errors}
                        readOnly={true}
                    />
                </Col>
                <Col>
                    <SelectComponent
                        label="Select Course Upload Type"
                        placeholder="Select Course Upload Type"
                        multiple={false}
                        readOnly={!!selectedCourse?.id}
                        options={optionForCourseUpload}
                        value={inputData.type}
                        name="type"
                        errors={errors}
                    />
                </Col>
            </Row>
            {renderCustomVideos()}
            {renderCourseUploadOptions()}
            {renderYoutubeVideos()}
            <CustomVideoList selectedCourse={selectedCourse}/>
            {renderUploadedAttachments()}
            {renderAttachmentUploadButton()}
            <CourseMaterialList selectedCourse={selectedCourse}/>
            <Row>
                <Col>
                    <EditorComponent
                        name="courseRequirements"
                        value={inputData.courseRequirements}
                        controlId="course_requirements"
                        label="Add Course Requirements"
                        errors={errors}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="courseFeatures"
                        value={inputData.courseFeatures}
                        controlId="course_features"
                        label="Add Course Features"
                        errors={errors}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="courseDescription"
                        controlId="course_description"
                        label="Add Course Description"
                        value={inputData.courseDescription}
                        errors={errors}
                    />
                </Col>
            </Row>
        </ModalComponent>
    );
};

export default CourseForm;
