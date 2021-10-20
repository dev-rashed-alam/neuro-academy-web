import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardBody from "../Modules/Dashboard/DashboardBody";
import FormElements from "../Modules/Forms/FormElements";
import FormContextProvider from "../Context/FormContext";
import UserList from "../Modules/User-management/User/Index";
import RoleList from "../Modules/User-management/Role/Index";
import PermissionList from "../Modules/User-management/Permission/Index";

export default class ProtectedRoute extends Component {
  render() {
    return (
      <>
        <FormContextProvider>
          <Dashboard>
            <Switch>
              <Route exact={true} path="/" component={DashboardBody} />
              <Route
                exact={true}
                path="/form-elements"
                component={FormElements}
              />
              <Route exact={true} path="/user-list" component={UserList} />
              <Route exact={true} path="/role-list" component={RoleList} />
              <Route exact={true} path="/permission-list" component={PermissionList} />
            </Switch>
          </Dashboard>
        </FormContextProvider>
      </>
    );
  }
}
