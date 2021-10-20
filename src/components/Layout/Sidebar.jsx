import React, { Component } from "react";
import { FaAngleDown, FaUserGraduate, FaDatabase } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const childMenuForUiKits = [
  {
    name: "Form Elements",
    link: "/form-elements",
  },
  {
    name: "Form Validation",
    link: "/",
  },
  {
    name: "Form TextArea",
    link: "/",
  },
  {
    name: "Form File Upload",
    link: "/",
  },
];

const childMenuForUserManagement = [
  {
    name: "Permission List",
    link: "/permission-list",
  },
  {
    name: "Total User List",
    link: "/user-list",
  },
  {
    name: "Total Role List",
    link: "/role-list",
  },
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      windowWidth: window.innerWidth,
      navItemOne: false,
      navItemTwo: false,
      navItemThree: false,
      isHoverItemOne: false,
      isHoverItemTwo: false,
    };
  }

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  collapseAbleItem = (itemName) => {
    if (this.props.toggle === false || this.state.windowWidth < 992) {
      let initState = this.initialState;
      delete initState[itemName];
      this.setState(initState);
      this.setState((prevState) => ({
        [itemName]: !prevState[itemName],
      }));
    } else {
      return false;
    }
  };

  navItemHover = (itemName) => {
    if (this.props.toggle === true && this.state.windowWidth > 992) {
      let initState = this.initialState;
      delete initState[itemName];
      this.setState(initState);
      this.setState((prevState) => {
        return {
          [itemName]: !prevState[itemName],
        };
      });
    }
  };

  renderSingleMenu = (path, icon, menuName, hoverState, active) => {
    return (
      <li
        className={`${
          this.state[hoverState] ? "nav-item hover-open" : "nav-item"
        } ${active ? active : ""}`}
        onMouseEnter={() => this.navItemHover(hoverState)}
        onMouseLeave={() => this.navItemHover(hoverState)}
      >
        <NavLink className="nav-link " to={path}>
          <span className="menu-icon">{icon}</span>
          <span className="menu-title">{menuName}</span>
        </NavLink>
      </li>
    );
  };

  renderCollapseAbleMenu = (
    icon,
    menuName,
    hoverState,
    navState,
    childMenu
  ) => {
    return (
      <li
        className={this.state[hoverState] ? "nav-item hover-open" : "nav-item"}
        onMouseEnter={() => this.navItemHover(hoverState)}
        onMouseLeave={() => this.navItemHover(hoverState)}
      >
        <p
          className="nav-link"
          onClick={() => this.collapseAbleItem(navState)}
          aria-expanded={this.state[navState]}
          style={{ userSelect: "none" }}
        >
          <span className="menu-icon">{icon}</span>
          <span className="menu-title">{menuName}</span>
          <span className="menu-arrow">
            <FaAngleDown />
          </span>
        </p>
        <div className={this.state[navState] ? "collapse show" : "collapse"}>
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              {childMenu.map((menu) => {
                return (
                  <NavLink className="nav-link" to={menu.link}>
                    {menu.name}
                  </NavLink>
                );
              })}
            </li>
          </ul>
        </div>
      </li>
    );
  };

  renderMenuList = () => {
    return (
      <>
        {this.renderSingleMenu(
          "/",
          <MdDashboard />,
          "Dashboard",
          "isHoverItemOne",
          "active"
        )}
        {this.renderCollapseAbleMenu(
          <FaUserGraduate />,
          "User Management",
          "isHoverItemTwo",
          "navItemOne",
          childMenuForUserManagement
        )}
        {this.renderCollapseAbleMenu(
          <FaDatabase />,
          "Ui Kits",
          "isHoverItemFour",
          "navItemTwo",
          childMenuForUiKits
        )}
      </>
    );
  };

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">{this.renderMenuList()}</ul>
      </nav>
    );
  }
}

export default Sidebar;
