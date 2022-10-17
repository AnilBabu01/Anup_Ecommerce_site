import React from "react";
import { Link } from "react-router-dom";
import Filter2Icon from "@mui/icons-material/Filter2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RocketIcon from "@mui/icons-material/Rocket";
import InventoryIcon from "@mui/icons-material/Inventory";
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper myallproductmain" style={{}}>
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Products
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>

              <li>
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
          <li>
            <Link to="/admin/slider">
              <Filter2Icon /> Slider
            </Link>
          </li>
          <li>
            <Link to="/admin/slider">
              <RocketIcon /> Shipping Service
            </Link>
          </li>
          <li>
            <Link to="/admin/slider">
              <InventoryIcon /> Rental Service
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
