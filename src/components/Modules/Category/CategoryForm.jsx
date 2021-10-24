import React from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";

const optionForStatus = [
    {value: true, label: "Enable"},
    {value: false, label: "Disable"},
];

const CategoryForm = (props) => {

    const handleSubmit = () => {
        props.triggerModal();
    };

    return (
        <ModalComponent
            show={props.modalShow}
            onHide={props.triggerModal}
            size="lg"
            title="Add New Category"
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
                        label="Category Name"
                        placeHolder="Enter Category Name"
                        name="categoryName"
                        required={false}
                        type="text"
                        controlId="category_name"
                    />
                </Col>
                <Col>
                    <SelectComponent
                        label="Select Status"
                        placeholder="Select Status"
                        multiple={false}
                        options={optionForStatus}
                        name="status"
                    />
                </Col>
            </Row>
        </ModalComponent>
    );
}

export default CategoryForm
