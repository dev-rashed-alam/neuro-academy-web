import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CouponForm from "./CouponForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";
import {FormContext} from "../../Context/FormContext";
import {getMethod} from "../../Config/ApiHandler";
import {formatDate, generatePagination, printApiErrors} from "../../Config/HelperUtils";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Title",
        accessor: "title",
    },
    {
        Header: "Code",
        accessor: "couponCode",
    },
    {
        Header: "Percentage",
        accessor: "discountPercent",
    },
    {
        Header: "Created Date",
        accessor: "createdDate",
    },
    {
        Header: "Expiry Date",
        accessor: "expiryDate",
    },
    {
        Header: "Action",
        accessor: "action",
    }
];


const CouponList = () => {

    const [modal, setModal] = useState(false)
    const [paginationUtil, setPaginationUtil] = useState({})
    const [tableData, setTableDta] = useState([]);
    const {setLoader, resetContext} = useContext(FormContext)
    const [couponListUtil, setCouponListUtil] = useState("/admin/coupons")
    const [selectedCoupon, setSelectedCoupon] = useState({})


    useEffect(() => {
        fetchCouponList()
    }, [couponListUtil])

    const fetchCouponList = async () => {
        setLoader(true)
        await getMethod(couponListUtil).then((response) => {
            let resultSet = [];
            let sl = 1;
            for (let item of response.data.data) {
                resultSet.push({
                    sl: sl++,
                    title: item.title,
                    couponCode: item.code,
                    discountPercent: item.percent,
                    createdDate: formatDate(item.created_at),
                    expiryDate: formatDate(item.expiry_date),
                    action: renderUpdateButton(item)
                })
            }
            setTableDta(resultSet);
            setPaginationUtil(generatePagination(response.data))
            setLoader(false)
        }).catch((error) => {
            setTableDta([]);
            setLoader(false)
            printApiErrors(error)
        })
    }

    const renderUpdateButton = (item) => {
        return <Button
            name="Update"
            className="btn btn-danger btn-sm"
            onClickEvent={() => openModalForUpdate(item)}
        />
    }

    const openModalForUpdate = (item) => {
        setSelectedCoupon(item);
        setModal(true)
    }

    const closeModal = () => {
        setSelectedCoupon({});
        resetContext();
        setModal(!modal)
    }


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
                        pagination={true}
                        triggerPagination={setCouponListUtil}
                        paginationUtil={paginationUtil}
                    />
                </Col>
            </Row>
            <CouponForm
                modalShow={modal}
                selectedCoupon={Object.keys(selectedCoupon).length > 0 ? selectedCoupon : undefined}
                fetchCouponList={fetchCouponList}
                triggerModal={closeModal}
            />
        </>
    )
};

export default CouponList