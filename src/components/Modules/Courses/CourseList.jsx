import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CourseForm from "./CourseForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";
import {FormContext} from "../../Context/FormContext";
import {
    formatDate, formatSecondsToDuration,
} from "../../Config/HelperUtils";
import {toast} from "react-toastify";
import {fetchCourses, updateCourseById} from "../../../services/Course";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Course Title",
        accessor: "courseTitle",
    },
    {
        Header: "Instructor Name",
        accessor: "instructorName",
    },
    {
        Header: "Published Date",
        accessor: "publishDate",
    },
    {
        Header: "Course Duration",
        accessor: "courseDuration",
    },
    {
        Header: "Number of Students",
        accessor: "numberOfStudents",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Update",
        accessor: "action",
    },
];

const CourseList = () => {
    const {setLoader, resetContext} = useContext(FormContext);
    const [modal, setModal] = useState(false);
    const [tableData, setTableDta] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({});

    useEffect(() => {
        fetchCourseList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openModalForUpdate = (item) => {
        setSelectedCourse(item);
        setModal(true);
    };

    const renderUpdateButton = (item) => {
        return (
            <Button
                name="Details"
                className="btn btn-danger btn-sm"
                onClickEvent={() => openModalForUpdate(item)}
            />
        );
    };

    const toggleCourseStatus = async (course, id) => {
        setLoader(true);
        let postData = {};
        postData.status = course.status === "enable" ? "disable" : "enable";
        await updateCourseById(postData, id);
        await fetchCourseList()
        setLoader(false);
        toast.success("Status Update Successful!");
    };

    const renderStatusButton = (course, id) => {
        return (
            <Button
                name={course.status === 'enable' ? "Enable" : "Disable"}
                className={`btn ${course.status === 'enable' ? 'btn-primary' : 'btn-danger'} btn-sm`}
                onClickEvent={() => toggleCourseStatus(course, id)}
            />
        );
    };

    const fetchCourseList = async () => {
        setLoader(true);
        const data = await fetchCourses()
        let resultSet = [];
        let sl = 1;
        for (let item of data) {
            resultSet.push({
                sl: sl++,
                courseTitle: item.title,
                instructorName: item.instructorName,
                publishDate: formatDate(item.createdAt),
                courseDuration: formatSecondsToDuration(item.courseDuration),
                courseTile: item.title,
                numberOfStudents: item.students?.length,
                status: renderStatusButton(item, item.id),
                action: renderUpdateButton(item),
            });
        }
        setTableDta(resultSet);
        setLoader(false);
    };

    const closeModal = () => {
        resetContext()
        setSelectedCourse({});
        setModal(!modal);
    };

    return (
        <>
            <Row className="p-20">
                <Col>
                    <h3>Course Summary</h3>
                </Col>
                <Col>
                    <Button
                        icon={<MdAddCircle/>}
                        name="Add New Course"
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
                        selection={false}
                        pagination={false}
                    />
                </Col>
            </Row>
            {modal && <CourseForm
                modalShow={modal}
                triggerModal={closeModal}
                fetchCourseList={fetchCourseList}
                selectedCourse={
                    Object.keys(selectedCourse).length > 0 ? selectedCourse : undefined
                }
            />}
        </>
    );
};

export default CourseList;
