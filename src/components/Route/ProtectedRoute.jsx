import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardBody from "../Modules/Dashboard/DashboardBody";
import FormElements from "../Modules/Forms/FormElements";
import StudentList from "../Modules/Students/StudentList";
import OrderList from "../Modules/Orders/OrderList";
import CourseList from "../Modules/Courses/CourseList";
import CategoryList from "../Modules/Category/CategoryList";
import CouponList from "../Modules/Coupons/CouponList";
import ArticleList from "../Modules/Articles/ArticleList";
import { getToken } from "../Config/SessionUtils";
import Profile from "../Modules/Profile/Profile";
import NotificationPage from "../Modules/Notification/NotificationPage";

const ProtectedRoute = () => {
  if (getToken() !== null) {
    return (
      <Dashboard>
        <Switch>
          <Route exact={true} path="/dashboard" component={DashboardBody} />
          <Route exact={true} path="/form-elements" component={FormElements} />
          <Route exact={true} path="/students" component={StudentList} />
          <Route exact={true} path="/orders" component={OrderList} />
          <Route exact={true} path="/courses" component={CourseList} />
          <Route exact={true} path="/categories" component={CategoryList} />
          <Route exact={true} path="/coupons" component={CouponList} />
          <Route exact={true} path="/articles" component={ArticleList} />
          <Route exact={true} path="/settings" component={Profile} />
          <Route
            exact={true}
            path="/notifications"
            component={NotificationPage}
          />
        </Switch>
      </Dashboard>
    );
  } else {
    return <Redirect push to="/" />;
  }
};

export default ProtectedRoute;
