import React, {useContext, useEffect} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import DatePickerComponent from "../../CommonComponents/Form/DatePickerComponent";
import {FormContext} from "../../Context/FormContext";

const optionForStatus = [
    {value: true, label: "Enable"},
    {value: false, label: "Disable"},
];

const CouponForm = ({triggerModal, modalShow, selectedCoupon}) => {
    const {inputData, setInputData} = useContext(FormContext)

    useEffect(() => {
        setInputData({
            ...inputData,
            "title": selectedCoupon.title,
            "couponCode": selectedCoupon.code,
            "percentage": selectedCoupon.percent,
            "expireDate": selectedCoupon.expiry_date,
        });
    }, [selectedCoupon])

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
                        value={inputData.title}
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
                        value={inputData.couponCode}
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
                        value={inputData.expireDate}
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
                        controlId="discount_percentage"
                    />
                </Col>
            </Row>
        </ModalComponent>
    );
}

export default CouponForm
