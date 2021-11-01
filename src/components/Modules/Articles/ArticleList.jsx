import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import ArticleForm from "./ArticleForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";

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
        Header: "Description",
        accessor: "description",
    },
    {
        Header: "View Details",
        accessor: "viewDetails",
    },
    {
        Header: "Status",
        accessor: "status",
    },
];

const tableData = [
    {
        sl: 1,
        title: "Graphics Design",
        description: "Rashed Alam",
        viewDetails: "View",
        status: "Active"
    },
];


const ArticleList = () => {

    const [modal, setModal] = useState(false)


    return (
        <>
            <Row className="p-20">
                <Col>
                    <h3>Article Summary</h3>
                </Col>
                <Col>
                    <Button
                        icon={<MdAddCircle/>}
                        name="Add New Article"
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
            <ArticleForm
                modalShow={modal}
                triggerModal={() => setModal(!modal)}
            />
        </>
    )
};

export default ArticleList