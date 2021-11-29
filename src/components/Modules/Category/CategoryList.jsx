import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CategoryForm from "./CategoryForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";
import {getMethod} from "../../Config/ApiHandler";
import {toast} from "react-toastify";
import {FormContext} from "../../Context/FormContext";
import {generatePagination, GeneratePagination} from "../../Config/HelperUtils"

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


    useEffect(() => {
        setLoader(true)
        let url = "/admin/categories"
        getMethod(url).then((response) => {
            let resultSet = [];
            let sl = 1;
            for (let item of response.data.data) {
                resultSet.push({
                    sl: sl++,
                    categoryName: item.title,
                    status: renderStatusButton(item.status),
                    action: "view"
                })
            }
            setTableDta(resultSet);
            setPaginationUtil(generatePagination(response.data))
            console.log(paginationUtil)
            setLoader(false)
        }).catch((error) => {
            setTableDta([]);
            setLoader(false)
            toast.error(error.response.data.message)
        })
    }, [])

    const renderStatusButton = (statusFlag) => {
        return <Button
            name={statusFlag === 1 ? "Enable" : "Disable"}
            className="btn btn-danger btn-sm"
            onClickEvent={() => console.log("Clicked")}
        />
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
                        pagination={true}
                        paginationUtil={paginationUtil}
                    />
                </Col>
            </Row>
            <CategoryForm
                modalShow={modal}
                triggerModal={() => setModal(!modal)}
            />
        </>
    )
};

export default CategoryList