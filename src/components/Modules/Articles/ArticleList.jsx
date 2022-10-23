import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import ArticleForm from "./ArticleForm";
import { Button } from "../../CommonComponents/Button";
import { MdAddCircle } from "react-icons/md";
import { FormContext } from "../../Context/FormContext";
import { getMethod } from "../../Config/ApiHandler";
import {
  formatDate,
  generatePagination,
  printApiErrors,
} from "../../Config/HelperUtils";

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
    Header: "Created Date",
    accessor: "createdDate",
  },
  {
    Header: "Total Views",
    accessor: "totalViews",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const ArticleList = () => {
  const [modal, setModal] = useState(false);
  const [paginationUtil, setPaginationUtil] = useState({});
  const [tableData, setTableDta] = useState([]);
  const { setLoader, resetContext } = useContext(FormContext);
  const [couponListUtil, setCouponListUtil] = useState("/admin/articles");
  const [selectedArticle, setSelectedArticle] = useState({});
  const [categoryListUrl] = useState("/admin/categories?limit=500");
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    setLoader(true);
    let resultSet = [];
    await getMethod(categoryListUrl)
      .then((response) => {
        let sl = 1;
        for (let item of response.data.data) {
          resultSet.push({
            sl: sl++,
            label: item.title,
            value: item.id,
          });
        }
        setCategoryList(resultSet);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        printApiErrors(error);
      });
  };

  useEffect(() => {
    fetchArticleList().then((r) => fetchCategoryList());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponListUtil]);

  const fetchArticleList = async () => {
    setLoader(true);
    await getMethod(couponListUtil)
      .then((response) => {
        let resultSet = [];
        let sl = 1;
        for (let item of response.data.data) {
          resultSet.push({
            sl: sl++,
            title: item.title,
            createdDate: formatDate(item.created_at),
            totalViews: item.total_views,
            action: renderUpdateButton(item),
          });
        }
        setTableDta(resultSet);
        setPaginationUtil(generatePagination(response.data));
        setLoader(false);
      })
      .catch((error) => {
        setTableDta([]);
        setLoader(false);
        printApiErrors(error);
      });
  };

  const renderUpdateButton = (item) => {
    return (
      <Button
        name="Update"
        className="btn btn-danger btn-sm"
        onClickEvent={() => openModalForUpdate(item)}
      />
    );
  };

  const openModalForUpdate = (item) => {
    setSelectedArticle(item);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedArticle({});
    resetContext();
    setModal(!modal);
  };

  return (
    <>
      <Row className="p-20">
        <Col>
          <h3>List of Articles</h3>
        </Col>
        <Col>
          <Button
            icon={<MdAddCircle />}
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
            pagination={true}
            triggerPagination={setCouponListUtil}
            paginationUtil={paginationUtil}
          />
        </Col>
      </Row>
      <ArticleForm
        modalShow={modal}
        selectedArticle={
          Object.keys(selectedArticle).length > 0 ? selectedArticle : undefined
        }
        fetchArticleList={fetchArticleList}
        triggerModal={closeModal}
        categoryList={categoryList}
      />
    </>
  );
};

export default ArticleList;
