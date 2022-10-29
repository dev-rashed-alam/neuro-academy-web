import React, { useContext, useEffect, useState } from "react";
import { ModalComponent } from "../../CommonComponents/ModalComponent";
import { Col, Row } from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import { FormContext } from "../../Context/FormContext";
import { postMethod } from "../../Config/ApiHandler";
import { getErrorMessages, printApiErrors } from "../../Config/HelperUtils";
import { categorySchema } from "../../../validations/ValidationSchema";

const optionForStatus = [
  { value: 1, label: "Enable" },
  { value: 0, label: "Disable" },
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
        title: selectedCategory.title,
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
    postData.title = inputData.title;
    postData.status = inputData.status?.value;
    categorySchema
      .validate(postData, { abortEarly: false })
      .then(async () => {
        setLoader(true);
        let url =
          selectedCategory !== undefined
            ? "/admin/categories/" + selectedCategory.id
            : "/admin/categories";
        await postMethod(url, postData)
          .then(async () => {
            await fetchCategoryList();
            setLoader(false);
            closeModal();
          })
          .catch((error) => {
            setLoader(false);
            printApiErrors(error);
          });
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
            name="title"
            value={inputData.title}
            required={false}
            type="text"
            controlId="category_name"
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
