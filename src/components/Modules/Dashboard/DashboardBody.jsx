import React, {useContext, useEffect, useState} from "react";
import {Row, Col, Card} from "react-bootstrap";
import {Card as CustomCard} from "../../CommonComponents/Card";
import LineChart from "../../CommonComponents/Chart/LineChart";
import BarChart from "../../CommonComponents/Chart/BarChart";
import {
    convertNumberToUSFormat
} from "../../Config/HelperUtils";
import PurchaseList from "../Purchases/PurchaseList";
import {FormContext} from "../../Context/FormContext";
import {fetchDashboardCounts, fetchPurchaseReportMonthly, fetchPurchaseReportWeekly} from "../../../services/Dashboard";

const DashboardBody = () => {
    const [dashboardCounts, setDashboardCounts] = useState({});
    const [weeklyPurchase, setWeeklyPurchase] = useState({});
    const [yearlyPurchase, setYearlyPurchase] = useState({});
    const {setLoader} = useContext(FormContext);

    const fetchDashboardInfos = async () => {
        try {
            setLoader(true)
            const counts = await fetchDashboardCounts()
            const weeklyData = await fetchPurchaseReportWeekly()
            const yearlyData = await fetchPurchaseReportMonthly()
            setYearlyPurchase(yearlyData)
            setWeeklyPurchase(weeklyData)
            setDashboardCounts(counts)
            setLoader(false)
        } catch (e) {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchDashboardInfos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTotalRevenue = () => {
        let total = 0;
        for(let item in yearlyPurchase){
            for(let month of yearlyPurchase[item]){
                total += parseInt(month.purchasePrice)
            }
        }
        return convertNumberToUSFormat(total)
    }

    return (
        <>
            <Row>
                <Col xs={6} sm={6} md={3}>
                    <CustomCard
                        value={`$${convertNumberToUSFormat(dashboardCounts.totalSale)}`}
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
                            <h3 className="text-center text-black">Daily Sales Report</h3>
                            <LineChart weeklyData={weeklyPurchase}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={6} className="mt-3 mb-5">
                    <Card>
                        <Card.Body className="pb-1">
                            <div className="text-center chart-details">
                                <p>Total Revenue of the year</p>
                                <h3>${getTotalRevenue()}</h3>
                            </div>
                            <BarChart yearlyData={yearlyPurchase}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <PurchaseList/>
        </>
    );
};

export default DashboardBody;
