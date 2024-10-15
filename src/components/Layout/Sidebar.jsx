import React, {Component} from "react";
import {
    FaUserGraduate,
    FaCodepen,
    FaBookReader,
    FaBlog, FaUsers,
} from "react-icons/fa";
import {FiSettings} from "react-icons/fi";
import {NavLink} from "react-router-dom";
import {GiPaintBucket, MdDashboard} from "react-icons/all";

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
            isHoverItemFive: false,
            isHoverItemSix: false,
            isHoverItemSeven: false,
            isHoverItemEight: false,
        };
    }

    updateDimensions = () => {
        this.setState({windowWidth: window.innerWidth});
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

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
                }`}
                onMouseEnter={() => this.navItemHover(hoverState)}
                onMouseLeave={() => this.navItemHover(hoverState)}
            >
                <NavLink className="nav-link " exact to={path} activeClassName="active">
                    <span className="menu-icon">{icon}</span>
                    <span className="menu-title">{menuName}</span>
                </NavLink>
            </li>
        );
    };

    renderMenuList = () => {
        return (
            <>
                {this.renderSingleMenu(
                    "/dashboard",
                    <MdDashboard/>,
                    "Dashboard",
                    "isHoverItemOne",
                    "active"
                )}
                {this.renderSingleMenu(
                    "/courses",
                    <FaUserGraduate/>,
                    "Course Management",
                    "isHoverItemTwo"
                )}
                {this.renderSingleMenu(
                    "/students",
                    <FaUsers/>,
                    "Student Management",
                    "isHoverItemThree"
                )}
                {this.renderSingleMenu(
                    "/orders",
                    <GiPaintBucket/>,
                    "Order Management",
                    "isHoverItemFour"
                )}
                {this.renderSingleMenu(
                    "/categories",
                    <FaBookReader/>,
                    "Category Management",
                    "isHoverItemFive"
                )}
                {this.renderSingleMenu(
                    "/articles",
                    <FaBlog/>,
                    "Article Management",
                    "isHoverItemSix"
                )}
                {this.renderSingleMenu(
                    "/coupons",
                    <FaCodepen/>,
                    "Coupon Management",
                    "isHoverItemSeven"
                )}
                {this.renderSingleMenu(
                    "/settings",
                    <FiSettings/>,
                    "Admin Profile Settings",
                    "isHoverItemEight"
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
