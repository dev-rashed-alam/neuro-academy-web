import React, {useContext, useEffect} from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import {Col, Row} from "react-bootstrap";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import DatePickerComponent from "../../CommonComponents/Form/DatePickerComponent";
import {FormContext} from "../../Context/FormContext";
import {postMethod} from "../../Config/ApiHandler";
import {printApiErrors, processDateForPost} from "../../Config/HelperUtils";

const CouponForm = ({triggerModal, modalShow, selectedCoupon, fetchCouponList}) => {
    const {inputData, setInputData, setLoader} = useContext(FormContext)

    useEffect(() => {
        if (selectedCoupon) {
            setInputData({
                ...inputData,
                "title": selectedCoupon.title,
                "couponCode": selectedCoupon.code,
                "percentage": selectedCoupon.percent,
                "expireDate": selectedCoupon.expiry_date,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCoupon])

    const handleSubmit = async () => {
        setLoader(true)
        let postData = {};
        postData.title = inputData.title;
        postData.code = inputData.couponCode;
        postData.percent = inputData.percentage;
        postData.expiry_date = processDateForPost(inputData.expireDate);
        let url = selectedCoupon !== undefined ? "/admin/coupons/" + selectedCoupon.id : "/admin/coupons";
        await postMethod(url, postData).then(async () => {
            await fetchCouponList();
            setLoader(false);
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
                    action: triggerModal,
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
                        name="expireDate"
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
