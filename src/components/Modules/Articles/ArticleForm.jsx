import React, {useContext, useEffect, useState} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Form, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import {FormContext} from "../../Context/FormContext";
import {
    filterPostData,
    getErrorMessages, isValidFileType
} from "../../Config/HelperUtils";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";
import UploadAttachment from "../../CommonComponents/Form/UploadAttachment";
import {articleSchema} from "../../../validations/ValidationSchema";
import {addArticle, updateArticleById} from "../../../services/Article";
import {toast} from "react-toastify";

const optionForStatus = [
    {value: "enable", label: "Enable"},
    {value: "disable", label: "Disable"},
];

const ArticleForm = ({
                         triggerModal,
                         modalShow,
                         selectedArticle,
                         fetchArticleList,
                         categoryList,
                     }) => {
    const {inputData, setInputData, setLoader} = useContext(FormContext);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedArticle) {
            setInputData({
                ...inputData,
                title: selectedArticle.title,
                description: selectedArticle.description,
                category: categoryList.find(
                    (item) => item.value === selectedArticle.category.id
                ),
                status: optionForStatus.find(
                    (item) => item.value === selectedArticle.status
                ),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedArticle]);

    const closeModal = () => {
        setInputData({});
        setErrors({});
        triggerModal();
    };

    const handleSubmit = async () => {
        if (inputData?.thumbnail && !isValidFileType(['image/jpeg', 'image/png'], inputData?.thumbnail?.type)) {
            toast.warning('Only .jpg, .png, .jpeg allowed!')
            return;
        }

        let postData = {
            title: inputData.title,
            description: inputData.description,
            categoryId: inputData.category?.value,
            status: inputData.status?.value
        };
        if (inputData.thumbnail) {
            postData['thumbnail'] = inputData.thumbnail
        }
        articleSchema
            .validate(filterPostData(postData), {abortEarly: false})
            .then(async () => {
                setLoader(true);
                if (!selectedArticle) await addArticle(postData)
                if (selectedArticle) await updateArticleById(postData, selectedArticle.id)
                await fetchArticleList();
                setLoader(false);
                closeModal();
            })
            .catch(function (err) {
                setErrors(getErrorMessages(err));
            });
    };

    return (
        <ModalComponent
            show={modalShow}
            onHide={closeModal}
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
                    action: closeModal,
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
                        value={inputData.title || ""}
                        required={false}
                        type="text"
                        controlId="article_title"
                        errors={errors}
                    />
                </Col>
                <Col>
                    <SelectComponent
                        label="Select Category"
                        placeholder="Select Category"
                        value={inputData.category || ""}
                        multiple={false}
                        options={categoryList}
                        name="category"
                        errors={errors}
                    />
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col>
                    <SelectComponent
                        label="Select Status"
                        placeholder="Status"
                        value={inputData.status || ""}
                        multiple={false}
                        options={optionForStatus}
                        name="status"
                        errors={errors}
                    />
                </Col>
                <Col>
                    <Form.Group controlId={"course_thumbnail"} key={`course_thumbnail`}>
                        <Form.Label>Upload Article Thumbnail</Form.Label>
                        <UploadAttachment name="thumbnail" errors={errors} accept="image/*"/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <EditorComponent
                        name="description"
                        controlId="description"
                        label="Article Description"
                        value={inputData.description || ""}
                        errors={errors}
                    />
                </Col>
            </Row>
        </ModalComponent>
    );
};

export default ArticleForm;
