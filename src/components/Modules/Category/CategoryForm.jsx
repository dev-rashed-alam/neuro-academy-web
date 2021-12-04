import React, {useContext, useEffect} from "react";
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

const CategoryForm = ({fetchCategoryList, triggerModal, modalShow, selectedCategory}) => {
    const {setLoader, inputData, setInputData} = useContext(FormContext)

    useEffect(() => {
        setInputData({
            ...inputData,
            "title": selectedCategory.title,
            "status": selectedCategory.status
        });
    }, [selectedCategory])

    const handleSubmit = () => {
        setLoader(true)
        let url = selectedCategory !== undefined ? "/admin/categories/" + selectedCategory.id : "/admin/categories";
        postMethod(url, inputData).then((response) => {
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
            title={selectedCategory !== undefined ? "Update Selected Category" : "Add New Category"}
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
                        label="Category Name"
                        placeHolder="Enter Category Name"
                        name="title"
                        value={selectedCategory.title}
                        required={false}
                        type="text"
                        controlId="category_name"
                    />
                </Col>
                <Col>
                    <SelectComponent
                        label="Select Status"
                        placeholder="Select Status"
                        value={optionForStatus.find(item => item.value === selectedCategory.status)}
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
