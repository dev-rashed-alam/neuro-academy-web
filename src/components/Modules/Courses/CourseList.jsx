import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CourseForm from "./CourseForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";
import {FormContext} from "../../Context/FormContext";
import {apiUrl, getMethod} from "../../Config/ApiHandler";
import {generatePagination, printApiErrors} from "../../Config/HelperUtils";

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
        Header: "Total Videos",
        accessor: "totalVideos",
    },
    {
        Header: "Number of Students",
        accessor: "numberOfStudents",
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
        courseTitle: "Graphics Design",
        instructorName: "Rashed Alam",
        publishDate: "10/07/2021",
        courseDuration: "120 Hours",
        totalVideos: "30",
        numberOfStudents: "123",
        viewDetails: "View",
        status: "Active"
    },
];


const CourseList = () => {

    const [modal, setModal] = useState(false)
    const [paginationUtil, setPaginationUtil] = useState({})
    const [tableData, setTableDta] = useState([]);
    const {setLoader, resetContext} = useContext(FormContext)


    useEffect(() => {
        fetchCourseList()
    }, [])

    const fetchCourseList = () => {
        setLoader(true)
        getMethod(apiUrl.courseList).then((response) => {
            console.log(response.data)
            // let resultSet = [];
            // let sl = 1;
            // for (let item of response.data.data) {
            //     resultSet.push({
            //         sl: sl++,
            //         categoryName: item.title,
            //         status: renderStatusButton(item.status, item.id),
            //         action: renderUpdateButton(item)
            //     })
            // }
            // setTableDta(resultSet);
            // setPaginationUtil(generatePagination(response.data))
            setLoader(false)
        }).catch((error) => {
            setTableDta([]);
            setLoader(false)
            printApiErrors(error)
        })
    }

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
                        selection={true}
                        pagination={true}
                    />
                </Col>
            </Row>
            <CourseForm
                modalShow={modal}
                triggerModal={() => setModal(!modal)}
            />
        </>
    )
};

export default CourseList