import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CategoryForm from "./CategoryForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";
import {getMethod, postMethod} from "../../Config/ApiHandler";
import {toast} from "react-toastify";
import {FormContext} from "../../Context/FormContext";
import {generatePagination, GeneratePagination, printApiErrors} from "../../Config/HelperUtils"

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Category Name",
        accessor: "categoryName",
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


const CategoryList = () => {

    const [modal, setModal] = useState(false);
    const [paginationUtil, setPaginationUtil] = useState({})
    const [tableData, setTableDta] = useState([]);
    const {setLoader} = useContext(FormContext)
    const [categoryListUrl, setCategoryListUrl] = useState("/admin/categories")


    useEffect(() => {
        fetchCategoryList()
    }, [categoryListUrl])

    const fetchCategoryList = () => {
        setLoader(true)
        getMethod(categoryListUrl).then((response) => {
            let resultSet = [];
            let sl = 1;
            for (let item of response.data.data) {
                resultSet.push({
                    sl: sl++,
                    categoryName: item.title,
                    status: renderStatusButton(item.status, item.id),
                    action: "view"
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

    const renderStatusButton = (statusFlag, id) => {
        console.log(id + "  " + statusFlag)
        return <Button
            key={"status_button_" + id}
            name={statusFlag === 1 ? "Enable" : "Disable"}
            className="btn btn-danger btn-sm"
            onClickEvent={() => toggleCategoryStatus(statusFlag, id)}
        />
    }

    const toggleCategoryStatus = (status, id) => {
        setLoader(true)
        let postData = {};
        postData.status = status === 0 ? 1 : 0;
        postMethod("/admin/categories/status/" + id, postData).then((response) => {
            setLoader(false)
            toast.success("Status Update Successful!");
            fetchCategoryList();
        }).catch((error) => {
            setLoader(false)
            printApiErrors(error)
        })
    }


    return (
        <>
            <Row className="p-20">
                <Col>
                    <h3>List of Categories</h3>
                </Col>
                <Col>
                    <Button
                        icon={<MdAddCircle/>}
                        name="Add New Category"
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
                        triggerPagination={setCategoryListUrl}
                        paginationUtil={paginationUtil}
                    />
                </Col>
            </Row>
            <CategoryForm
                modalShow={modal}
                fetchCategoryList={fetchCategoryList}
                triggerModal={() => setModal(!modal)}
            />
        </>
    )
};

export default CategoryList