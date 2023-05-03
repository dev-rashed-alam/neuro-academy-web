import React, { Component } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";
import { FormContext } from "../Context/FormContext";

class Dashboard extends Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);
    this.state = {
      navigationDrawer: false,
    };
  }

  toggleBar = () => {
    this.setState({
      navigationDrawer: !this.state.navigationDrawer,
    });
  };

  render() {
    return (
      <div
        className={this.state.navigationDrawer ? "sidebar-icon-only" : "App"}
      >
        <DashboardHeader toggleBar={this.toggleBar} />
        <div className="container-fluid page-body-wrapper">
          <Sidebar toggle={this.state.navigationDrawer} />
          <div className="main-panel">
            <div className="content-wrapper">
              <Container fluid>{this.props.children}</Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
