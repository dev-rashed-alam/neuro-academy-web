import React, {useEffect, useState} from "react";
import {Row, Col, Card} from "react-bootstrap";
import {Card as CustomCard} from "../../CommonComponents/Card";
import LineChart from "../../CommonComponents/Chart/LineChart";
import BarChart from "../../CommonComponents/Chart/BarChart";
import {
    convertNumberToUSFormat
} from "../../Config/HelperUtils";
import PurchaseList from "../Purchases/PurchaseList";

const DashboardBody = () => {
    const [dashboardCounts,] = useState({
        totalSales: 0,
        totalPurchase: 0,
        totalStudent: 0,
        totalCourse: 0,
    });

    useEffect(() => {
        // fetchDashboardCount()
        //   .then(({ data }) => {
        //     setDashboardCounts({
        //       totalSales: data.data.total_sales,
        //       totalPurchase: data.data.total_purchase,
        //       totalStudent: data.data.total_student,
        //       totalCourse: data.data.total_course,
        //     });
        //     setLoader(false);
        //   })
        //   .catch((error) => {
        //     setLoader(false);
        //     printApiErrors(error);
        //   });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row>
                <Col xs={6} sm={6} md={3}>
                    <CustomCard
                        value={`$${convertNumberToUSFormat(dashboardCounts.totalSales)}`}
                        name="All Time Sales"
                    />
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <CustomCard
                        value={`${convertNumberToUSFormat(dashboardCounts.totalPurchase)}`}
                        name="Total Purchases"
                    />
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <CustomCard
                        value={`${convertNumberToUSFormat(dashboardCounts.totalStudent)}`}
                        name="Total Students"
                    />
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <CustomCard
                        value={`${convertNumberToUSFormat(dashboardCounts.totalCourse)}`}
                        name="Total Courses"
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={6} className="mt-3 mb-5">
                    <Card>
                        <Card.Body>
                            <h3 className="text-center">Sales Report</h3>
                            <LineChart/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={6} className="mt-3 mb-5">
                    <Card>
                        <Card.Body className="pb-1">
                            <div className="text-center chart-details">
                                <p>Total Revenue of the year</p>
                                <h3>$80,940</h3>
                            </div>
                            <BarChart/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <PurchaseList/>
        </>
    );
};

export default DashboardBody;
