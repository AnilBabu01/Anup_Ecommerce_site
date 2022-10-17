import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "../header/Navbar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
const ComNavlink = () => {
  const [isMobile, setisMobile] = useState(false);
  return (
    <div>
      <div className="catemaindiv">
        <i
          style={{ marginRight: "20px" }}
          onClick={() => setisMobile(!isMobile)}
          className={style.mobileMenuIcon}
        >
          {isMobile ? (
            <>
              <h1>hide Catecogory</h1>
            </>
          ) : (
            <>
              <h1>Show Catecogory</h1>
            </>
          )}
        </i>
        <ul className={isMobile ? style.showcate : style.navlinks}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/categories"
            >
              Women
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/category/men"
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/category/kids"
            >
              Kids
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/category/beauty"
            >
              Beauty
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/category/accessories"
            >
              Accessories
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/category/eletronic"
            >
              Electronic Devices
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/category/mobile"
            >
              Mobile
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activecategory : style.category
              }
              to="/category/jewellery"
            >
              Jewellery
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ComNavlink;
