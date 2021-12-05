import React from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import DatePickerComponent from "../../CommonComponents/Form/DatePickerComponent";

const optionForStatus = [
    {value: true, label: "Enable"},
    {value: false, label: "Disable"},
];

const CouponForm = ({fetchCouponList, triggerModal, modalShow, selectedCoupon}) => {

    const handleSubmit = () => {

    };

    return (
        <ModalComponent
            show={modalShow}
            onHide={triggerModal}
            size="lg"
            title={Object.keys(selectedCoupon).length !== 0 ? "Update Selected Coupon" : "Add New Coupon"}
            scrollable={false}
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
                        label="Coupon Title"
                        placeHolder="Enter Coupon Title"
                        name="title"
                        required={false}
                        type="text"
                        controlId="coupon_title"
                    />
                </Col>
                <Col>
                    <TextComponent
                        label="Coupon Code"
                        placeHolder="Enter Coupon Code"
                        name="couponCode"
                        required={false}
                        type="text"
                        controlId="coupon_code"
                    />
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col>
                    <DatePickerComponent
                        label="Select Expiry Date"
                        placeHolder="dd-mm-yyyy"
                    />
                </Col>
                <Col>
                    <TextComponent
                        label="Percentage"
                        placeHolder="Enter Discount Percentage"
                        name="percentage"
                        required={false}
                        type="text"
                        controlId="discount_percentage"
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

export default CouponForm
