import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import {Button} from "../../CommonComponents/Button";
import {FormContext} from "../../Context/FormContext";
import {formatDate} from "../../Config/HelperUtils";
import {findAllStudentMcqByCourseAndMcqId} from "../../../services/Course";
import {useParams} from "react-router-dom";
import McqSubmissionModal from "./McqSubmissionModal";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Student Name",
        accessor: "studentName",
    },
    {
        Header: "Email Address",
        accessor: "email",
    },
    {
        Header: "Phone Number",
        accessor: "phoneNumber",
    },
    {
        Header: "Submit Date",
        accessor: "createdDate",
    },
    {
        Header: "View",
        accessor: "status",
    }
];

const McqWiseStudentList = () => {
    const [selected, setSelected] = useState(null)
    const [selectedMCQ, setSelectedMCQ] = useState(null)
    const [courseInfo, setCourseInfo] = useState({})
    const [tableData, setTableDta] = useState([]);
    const {setLoader} = useContext(FormContext);
    const {courseId, mcqId} = useParams();

    useEffect(() => {
        fetchStudentList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchStudentList = async () => {
        setLoader(true);
        const data = await findAllStudentMcqByCourseAndMcqId(courseId, mcqId);
        setSelectedMCQ(data.mcq)
        setCourseInfo({
            courseName: data.studentResponse[0].courseId.title,
            mcqTitle: data.mcq.title
        })
        let resultSet = [];
        let sl = 1;
        for (let item of data.studentResponse) {
            resultSet.push({
                sl: sl++,
                studentName: `${item.userId.firstName} ${item.userId.lastName}`,
                email: item.userId.email,
                phoneNumber: item.userId.phoneNumber,
                createdDate: formatDate(item.submittedAt),
                status: renderStatusButton(item)
            });
        }
        setTableDta(resultSet);
        setLoader(false);
    };

    const renderStatusButton = (item) => {
        return (
            <Button
                name={'View Submission'}
                className={`btn btn-primary btn-sm`}
                onClickEvent={() => toggleSubmission(item)}
            />
        );
    };

    const toggleSubmission = async (item) => {
        setSelected(item)
    };

    const onCloseModal = () => {
        setSelected(null)
    }

    return (
        <>
            <div className="order-details mb-5">
                <div className="order-table-footer">
                    <div className="flex">
                        <div className="flex-col">
                            <span>Course Name</span>
                            <span>{courseInfo.courseName}</span>
                        </div>
                        <div className="flex-col">
                            <span>MCQ Title</span>
                            <span>{courseInfo.mcqTitle}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Row>
                <Col>
                    <TableComponent
                        tableColumn={tableColumn}
                        tableData={tableData}
                        selection={false}
                    />
                </Col>
            </Row>
            {selected !== null && <McqSubmissionModal
                modalShow={true}
                triggerModal={onCloseModal}
                mcq={selectedMCQ}
                studentResponse={selected}
            />}
        </>
    );
};

export default McqWiseStudentList;
