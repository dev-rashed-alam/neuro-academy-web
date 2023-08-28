import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import {FormContext} from "../../Context/FormContext";
import {formatDate} from "../../Config/HelperUtils";
import {Button} from "../../CommonComponents/Button";
import {useHistory} from "react-router-dom";
import {findAllPurchase} from "../../../services/Purchase";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Invoice Number",
        accessor: "invoiceNumber",
    },
    {
        Header: "Payment Method",
        accessor: "paymentMethod",
    },
    {
        Header: "User Name",
        accessor: "userName",
    },
    {
        Header: "Course Title",
        accessor: "courseTitle",
    },
    {
        Header: "Purchase Date",
        accessor: "purchaseDate",
    },
    {
        Header: "Purchase Amount",
        accessor: "purchaseAmount",
    },
    {
        Header: "View Details",
        accessor: "action",
    },
];

const PurchaseList = () => {
    const [tableData, setTableDta] = useState([]);
    const {setLoader} = useContext(FormContext);
    const history = useHistory();

    useEffect(() => {
        fetchPurchaseList();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderViewButton = (item) => {
        return (
            <Button
                onClickEvent={() => history.push(`/order/details/${item.id}`)}
                name="View"
                className="btn btn-primary btn-sm"
            />
        );
    };

    const renderCourseTitle = (courseList = []) => {
        let courseTitleArray = courseList.map(item => item.title)
        return courseTitleArray.join(", ")
    }

    const fetchPurchaseList = async () => {
        setLoader(true);
        const data = await findAllPurchase()
        let resultSet = [];
        let sl = 1;
        for (let item of data) {
            let userName = item?.student?.firstName ? `${item?.student?.firstName} ` : ''
            userName += item?.student?.lastName || ''
            resultSet.push({
                sl: sl++,
                invoiceNumber: item.invoiceNumber,
                paymentMethod: item.paymentMethod,
                userName: userName === undefined ? '' : userName,
                courseTitle: renderCourseTitle(item.courses),
                purchaseAmount: item.purchasePrice,
                purchaseDate: formatDate(item.createdAt),
                action: renderViewButton(item),
            });
        }
        setTableDta(resultSet);
        setLoader(false);
    };

    return (
        <Row>
            <Col>
                <TableComponent
                    tableColumn={tableColumn}
                    tableData={tableData}
                    selection={false}
                />
            </Col>
        </Row>
    );
};

export default PurchaseList;
