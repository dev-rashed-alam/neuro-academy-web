import React, { useContext, useEffect, useState } from "react";
import { ModalComponent } from "../../CommonComponents/ModalComponent";
import { Col, Row } from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import { FormContext } from "../../Context/FormContext";
import { getErrorMessages } from "../../Config/HelperUtils";
import { categorySchema } from "../../../validations/ValidationSchema";
import {addCategory, updateCategoryById} from "../../../services/Category";

const optionForStatus = [
  { value: "enable", label: "Enable" },
  { value: "disable", label: "Disable" },
];

const CategoryForm = ({
  fetchCategoryList,
  triggerModal,
  modalShow,
  selectedCategory,
}) => {
  const { setLoader, inputData, setInputData } = useContext(FormContext);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCategory) {
      let status = optionForStatus.find(
        (item) => item.value === selectedCategory.status
      );
      setInputData({
        ...inputData,
        name: selectedCategory.name,
        status: status,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const closeModal = () => {
    setErrors({});
    triggerModal();
  };

  const handleSubmit = async () => {
    let postData = {};
    postData.name = inputData.name;
    postData.status = inputData.status?.value;
    categorySchema
      .validate(postData, { abortEarly: false })
      .then(async () => {
        setLoader(true);
        if(!selectedCategory) await addCategory(postData)
        if(selectedCategory) await updateCategoryById(postData, selectedCategory.id)
        await fetchCategoryList();
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
      title={
        selectedCategory !== undefined
          ? "Update Selected Category"
          : "Add New Category"
      }
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
            label="Category Name"
            placeHolder="Enter Category Name"
            name="name"
            value={inputData.name}
            required={false}
            type="text"
            controlId="name"
            errors={errors}
          />
        </Col>
        <Col>
          <SelectComponent
            label="Select Status"
            placeholder="Select Status"
            value={inputData.status}
            multiple={false}
            options={optionForStatus}
            name="status"
            errors={errors}
          />
        </Col>
      </Row>
    </ModalComponent>
  );
};

export default CategoryForm;
