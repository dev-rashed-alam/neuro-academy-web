import React, { useContext, useEffect, useState } from "react";
import { ModalComponent } from "../../CommonComponents/ModalComponent";
import { Col, Row } from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import DatePickerComponent from "../../CommonComponents/Form/DatePickerComponent";
import { FormContext } from "../../Context/FormContext";
import {
  getErrorMessages,
  processDateForPost,
} from "../../Config/HelperUtils";
import { couponSchema } from "../../../validations/ValidationSchema";
import {addCoupon, updateCouponById} from "../../../services/Coupon";

const CouponForm = ({
  triggerModal,
  modalShow,
  selectedCoupon,
  fetchCouponList,
}) => {
  const { inputData, setInputData, setLoader } = useContext(FormContext);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (selectedCoupon) {
      setInputData({
        ...inputData,
        title: selectedCoupon.title,
        couponCode: selectedCoupon.couponCode,
        percentage: selectedCoupon.percentage,
        expiryDate: selectedCoupon.expiryDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCoupon]);

  const closeModal = () => {
    setInputData({});
    setErrors({});
    triggerModal();
  };

  const handleSubmit = async () => {
    let postData = { ...inputData };
    postData.expiryDate = processDateForPost(inputData.expiryDate)?.split(" ")[0];

    couponSchema
      .validate(postData, { abortEarly: false })
      .then(async () => {
        setLoader(true);
        if(selectedCoupon){
          await updateCouponById(postData, selectedCoupon.id)
        }else{
          await addCoupon(postData)
        }
        await fetchCouponList();
        setLoader(false)
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
      title={selectedCoupon ? "Update Selected Coupon" : "Add New Coupon"}
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
            label="Coupon Title"
            placeHolder="Enter Coupon Title"
            name="title"
            value={inputData.title}
            required={false}
            type="text"
            controlId="title"
            errors={errors}
          />
        </Col>
        <Col>
          <TextComponent
            label="Coupon Code"
            placeHolder="Enter Coupon Code"
            name="couponCode"
            value={inputData.couponCode}
            required={false}
            type="text"
            controlId="couponCode"
            errors={errors}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          <DatePickerComponent
            label="Select Expiry Date"
            placeHolder="dd-mm-yyyy"
            value={inputData.expiryDate}
            name="expiryDate"
            errors={errors}
          />
        </Col>
        <Col>
          <TextComponent
            label="Percentage"
            placeHolder="Enter Discount Percentage"
            value={inputData.percentage}
            name="percentage"
            required={false}
            type="text"
            controlId="percentage"
            errors={errors}
          />
        </Col>
      </Row>
    </ModalComponent>
  );
};

export default CouponForm;
