import React, {useContext} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import {FormContext} from "../../Context/FormContext";
import {postMethod} from "../../Config/ApiHandler";
import {printApiErrors} from "../../Config/HelperUtils";

const optionForStatus = [
    {value: 1, label: "Enable"},
    {value: 0, label: "Disable"},
];

const CategoryForm = ({fetchCategoryList, triggerModal, modalShow}) => {
    const {setLoader, inputData} = useContext(FormContext)

    const handleSubmit = () => {
        setLoader(true)
        postMethod("/admin/categories", inputData).then((response) => {
            setLoader(false);
            fetchCategoryList();
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
                    action: triggerModal,
                    className: "btn btn-danger",
                },
            ]}
        >
            <Row className="align-items-center">
                <Col>
                    <TextComponent
                        label="Category Name"
                        placeHolder="Enter Category Name"
                        name="title"
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
