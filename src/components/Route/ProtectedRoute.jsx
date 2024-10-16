import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardBody from "../Modules/Dashboard/DashboardBody";
import FormElements from "../Modules/Forms/FormElements";
import PurchaseList from "../Modules/Purchases/PurchaseList";
import CourseList from "../Modules/Courses/CourseList";
import CategoryList from "../Modules/Category/CategoryList";
import CouponList from "../Modules/Coupons/CouponList";
import ArticleList from "../Modules/Articles/ArticleList";
import {getToken} from "../Config/SessionUtils";
import Profile from "../Modules/Profile/Profile";
import PurchaseDetails from "../Modules/Purchases/PurchaseDetails";
import UserList from "../Modules/User/UserList";
import McqWiseStudentList from "../Modules/Courses/McqWiseStudentList";

const ProtectedRoute = () => {
    if (getToken() !== null) {
        return (
            <Dashboard>
                <Switch>
                    <Route exact={true} path="/dashboard" component={DashboardBody}/>
                    <Route exact={true} path="/form-elements" component={FormElements}/>
                    <Route exact={true} path="/orders" component={PurchaseList}/>
                    <Route
                        exact={true}
                        path="/order/details/:id"
                        component={PurchaseDetails}
                    />
                    <Route exact={true} path="/courses" component={CourseList}/>
                    <Route exact={true} path="/course/:courseId/mcq/:mcqId" component={McqWiseStudentList}/>
                    <Route exact={true} path="/categories" component={CategoryList}/>
                    <Route exact={true} path="/students" component={UserList}/>
                    <Route exact={true} path="/coupons" component={CouponList}/>
                    <Route exact={true} path="/articles" component={ArticleList}/>
                    <Route exact={true} path="/settings" component={Profile}/>
                </Switch>
            </Dashboard>
        );
    } else {
        return <Redirect to="/"/>;
    }
};

export default ProtectedRoute;
