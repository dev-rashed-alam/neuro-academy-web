import React from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";

const optionForStatus = [
    {value: true, label: "Enable"},
    {value: false, label: "Disable"},
];

const CouponForm = (props) => {

    const handleSubmit = () => {
        props.triggerModal();
    };

    return (
        <ModalComponent
            show={props.modalShow}
            onHide={props.triggerModal}
            size="lg"
            title="Add New Coupon"
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
                        label="Coupon Code"
                        placeHolder="Enter Coupon Code"
                        name="couponCode"
                        required={false}
                        type="text"
                        controlId="coupon_code"
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
