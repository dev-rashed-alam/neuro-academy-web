import React, {useEffect, useState} from "react"
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import {Button} from "../../CommonComponents/Button";

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
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    }
];

const DraftMcq = ({mcqList}) => {

    const [tableData, setTableData] = useState([]);

    const renderStatusButton = (mcq) => {
        return (
            <Button
                name={mcq?.id ? 'View Submissions' : 'Pending Question'}
                className={`btn ${mcq?.id ? 'btn-primary' : 'btn-danger'} btn-sm`}
                disabled={!mcq?.id}
            />
        );
    };

   const renderActionButton = (mcq) => {
        return (
            <Button
                name='Delete'
                className={`btn btn-danger btn-sm`}
            />
        );
    };


    useEffect(() => {
        let tmpTableData = mcqList.map((item, i) => ({
            sl: i + 1,
            title: item.title,
            description: item.description,
            noOfQuestion: item.questions.length,
            status: renderStatusButton(item),
            action: renderActionButton(item)
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