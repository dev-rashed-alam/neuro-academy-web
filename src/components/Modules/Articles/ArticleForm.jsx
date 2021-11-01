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

const ArticleForm = (props) => {

    const {videos, addDynamicVideos, inputData, addNewYoutubeVideos,youtubeVideos,tutorials} = useContext(FormContext);

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
        let postData = {...inputData};
        postData["customVideos"] = [...tutorials];
        postData["youtubeVideos"] = [...youtubeVideos];

        console.log(postData);

    };

    const handleClose = () => {
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
            title="Add New Article"
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
                        label="Article Title"
                        placeHolder="Enter Article Title"
                        name="articleTitle"
                        required={false}
                        type="text"
                        controlId="article_title"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="description"
                        controlId="article_description"
                        label="Article Description"
                    />
                </Col>
            </Row>
        </ModalComponent>
    );
}

export default ArticleForm
