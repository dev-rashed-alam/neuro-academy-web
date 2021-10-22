import React from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Occupation",
        accessor: "occupation",
    },
    {
        Header: "View Details",
        accessor: "details",
    },
    {
        Header: "Status",
        accessor: "status",
    },
];

const tableData = [
    {
        sl: 1,
        name: "Rashed Alam",
        email: "dev.rashedalam@gmail.com",
        occupation: "Student",
        details: "View",
        status: "Active"
    },
];


const StudentList = () => {
    return (
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
    )
};

export default StudentList