import React from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";

const ArticleForm = (props) => {

    const handleSubmit = () => {

    };

    const handleClose = () => {
        props.triggerModal();
    };

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
