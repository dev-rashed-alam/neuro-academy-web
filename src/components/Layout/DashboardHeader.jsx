import React, { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiSearchEyeLine } from "react-icons/ri";
import { FaFreeCodeCamp } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import DashboardNotification from "./DashboardNotification";
import Avatar from "./Avatar";

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      isOpenNotification: false,
      isOpenMessage: false,
      isOpenAvatar: false,
    };
  }

  hoverOpen = (itemName) => {
    let initState = this.initialState;
    delete initState[itemName];
    this.setState(initState);
    this.setState((prevState) => ({
      [itemName]: !prevState[itemName],
    }));
  };

  render() {
    return (
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/">
            <span className="img">
              <FaFreeCodeCamp />
              &nbsp;&nbsp;E-Academy
            </span>
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/">
            <span className="img">
              <FaFreeCodeCamp />
            </span>
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end justify-content-lg-start">
          <div onClick={this.props.toggleBar} className="sidebar-toggle">
            <GiHamburgerMenu />
          </div>
          <ul className="navbar-nav ml-3">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="search">
                    <RiSearchEyeLine />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="search"
                  aria-label="search"
                  aria-describedby="search"
                />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav right-nav-style ml-auto pr-4">
            <DashboardNotification
              hoverOpen={this.hoverOpen}
              stateValue={this.state.isOpenMessage}
              stateName="isOpenMessage"
              title="Notifications"
              icon={<IoIosNotifications />}
            />
            <Avatar
              hoverOpen={this.hoverOpen}
              stateValue={this.state.isOpenAvatar}
              stateName="isOpenAvatar"
            />
          </ul>
        </div>
      </nav>
    );
  }
}

export default DashboardHeader;
