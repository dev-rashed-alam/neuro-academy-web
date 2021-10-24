import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CouponForm from "./CouponForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Coupon",
        accessor: "coupon",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const tableData = [
    {
        sl: 1,
        coupon: "Graphics Design",
        status: "Enable",
        action: "action"
    },
];


const CouponList = () => {

    const [modal, setModal] = useState(false)


    return (
        <>
            <Row className="p-20">
                <Col>
                    <h3>List of Coupons</h3>
                </Col>
                <Col>
                    <Button
                        icon={<MdAddCircle/>}
                        name="Add New Coupon"
                        className="btn btn-primary float-right"
                        onClickEvent={() => setModal(!modal)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableComponent
                        tableColumn={tableColumn}
                        tableData={tableData}
                        selection={true}
                        pagination={true}
                    />
                </Col>
            </Row>
            <CouponForm
                modalShow={modal}
                triggerModal={() => setModal(!modal)}
            />
        </>
    )
};

export default CouponList