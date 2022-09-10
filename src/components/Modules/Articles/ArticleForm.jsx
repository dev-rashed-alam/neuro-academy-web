import React, {useContext, useEffect} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import {FormContext} from "../../Context/FormContext";
import {postMethod} from "../../Config/ApiHandler";
import {printApiErrors} from "../../Config/HelperUtils";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";
import UploadAttachment from "../../CommonComponents/Form/UploadAttachment";

const optionForStatus = [
    {value: 1, label: "Enable"},
    {value: 0, label: "Disable"},
];


const ArticleForm = ({triggerModal, modalShow, selectedArticle, fetchArticleList, categoryList}) => {
    const {inputData, setInputData, setLoader} = useContext(FormContext)

    useEffect(() => {
        if (selectedArticle) {
            setInputData({
                ...inputData,
                "title": selectedArticle.title,
                "description": selectedArticle.body,
                "category": categoryList.find(item => item.value === selectedArticle.category_id),
                "body": selectedArticle.body,
                "status": optionForStatus.find(item => item.value === selectedArticle.status)
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedArticle])

    const handleSubmit = async () => {
        setLoader(true)
        let postData = {};
        postData.title = inputData.title;
        postData.category_id = inputData.category["value"];
        postData.status = inputData.status["value"];
        postData.body = inputData.description;
        let url = selectedArticle !== undefined ? "/admin/articles/" + selectedArticle.id : "/admin/articles";
        await postMethod(url, postData).then(async (response) => {
            await fetchArticleList();
            setLoader(false);
            triggerModal();
        }).catch((error) => {
            setLoader(false);
            printApiErrors(error)
        })
    };

    return (
        <ModalComponent
            show={modalShow}
            onHide={triggerModal}
            size="lg"
            title={selectedArticle ? "Update Selected Article" : "Add New Article"}
            scrollable={false}
            buttons={[
                {
                    name: "Submit",
                    action: handleSubmit,
                    className: "btn btn-primary",
                },
                {
                    name: "Close",
                    action: triggerModal,
                    className: "btn btn-danger",
                },
            ]}
        >
            <Row className="align-items-center">
                <Col>
                    <TextComponent
                        label="Article Title"
                        placeHolder="Enter Title"
                        name="title"
                        value={inputData.title}
                        required={false}
                        type="text"
                        controlId="article_title"
                    />
                </Col>
                <Col>
                    <SelectComponent
                        label="Select Category"
                        placeholder="Select Category"
                        value={inputData.category}
                        multiple={false}
                        options={categoryList}
                        name="category"
                    />
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col>
                    <SelectComponent
                        label="Select Status"
                        placeholder="Status"
                        value={inputData.status}
                        multiple={false}
                        options={optionForStatus}
                        name="status"
                    />
                </Col>
                <Col>
                    <UploadAttachment/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="description"
                        controlId="description"
                        label="Article Description"
                        value={inputData.description}
                    />
                </Col>
            </Row>

        </ModalComponent>
    );
}

export default ArticleForm
