import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardBody from "../Modules/Dashboard/DashboardBody";
import FormElements from "../Modules/Forms/FormElements";
import FormContextProvider from "../Context/FormContext";
import StudentList from "../Modules/Students/StudentList";
import SalesList from "../Modules/Sales/SalesList";
import CourseList from "../Modules/Courses/CourseList";

export default class ProtectedRoute extends Component {
  render() {
    return (
      <>
        <FormContextProvider>
          <Dashboard>
            <Switch>
              <Route exact={true} path="/dashboard" component={DashboardBody} />
              <Route
                exact={true}
                path="/form-elements"
                component={FormElements}
              />
              <Route exact={true} path="/students" component={StudentList} />
              <Route exact={true} path="/sales" component={SalesList} />
              <Route exact={true} path="/courses" component={CourseList} />
            </Switch>
          </Dashboard>
        </FormContextProvider>
      </>
    );
  }
}
