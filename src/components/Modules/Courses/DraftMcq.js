import React, {useEffect, useState} from "react"
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";

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
        Header: "No of Question",
        accessor: "noOfQuestion",
    }
];

const DraftMcq = ({mcqList}) => {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        let tmpTableData = mcqList.map((item, i) => ({
            sl: i + 1,
            title: item.title,
            description: item.description,
            noOfQuestion: item.questions.length
        }))
        setTableData(tmpTableData)
    }, [mcqList])

    return (
        <Row>
            <Col className={"custom-video-list"}>
                {mcqList?.length > 0 && (
                    <TableComponent
                        tableColumn={tableColumn}
                        tableData={tableData}
                        selection={false}
                        pagination={false}
                        search={false}
                    />
                )}
            </Col>
        </Row>
    )
}

export default DraftMcq