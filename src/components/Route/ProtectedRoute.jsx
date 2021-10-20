import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardBody from "../Modules/Dashboard/DashboardBody";
import FormElements from "../Modules/Forms/FormElements";
import FormContextProvider from "../Context/FormContext";
import UserList from "../Modules/User-management/User/Index";
import RoleList from "../Modules/User-management/Role/Index";
import PermissionList from "../Modules/User-management/Permission/Index";
import StudentList from "../Modules/Students/Index";
import SalesList from "../Modules/Sales/Index";
import CourseList from "../Modules/Courses/Index";

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
              <Route exact={true} path="/user-list" component={UserList} />
              <Route exact={true} path="/role-list" component={RoleList} />
              <Route exact={true} path="/permission-list" component={PermissionList} />
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
