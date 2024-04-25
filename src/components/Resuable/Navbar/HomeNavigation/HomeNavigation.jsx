import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import style from "./HomeNavigation.module.css";
import Logo from "../Logo";
import { Tooltip } from "antd";

const HomeNavigation = () => {
  const navItems = [
    { path: "/", name: "Hotel & Homes" },
    { path: "/list-property", name: "List Property", isListProperty: true },
    { path: "/register", name: "Register" },
    { path: "/login", name: "Login" },
  ];

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  // const [tooltipVisible, setTooltipVisible] = useState(false);

  // const handleTooltipVisibleChange = (visible) => {
  //   setTooltipVisible(visible);
  // };

  return (
    <>
      <nav className={style.homeNavigation}>
        <div className={style.navbarWrapper}>
          <span className={style.logos}>
            <li to="/" className={style.logobox}>
              <Logo />
            </li>
          </span>
          <span className={style.navItemsWrapper}>
            <ol
              className={
                click ? `${style.navMenu} ${style.active}` : style.navMenu
              }
            >
              {navItems.map((item, index) => (
                <li key={index} className={style.navigationItem}>
                  {item.isListProperty ? (
                    <Tooltip
                      title="List Your Property"
                      placement="top"
                      overlayStyle={{ backgroundColor: "white" }}
                      // visible={tooltipVisible}
                      // onVisibleChange={handleTooltipVisibleChange}
                    >
                      <NavLink
                        to={item.path}
                        exact="true"
                        className={`
                          ${style.navLink}
                          ${style.listPropertyNavLink}
                        `}
                        activeClassName={style.active}
                        onClick={handleClick}
                      >
                        {item.name}
                      </NavLink>
                    </Tooltip>
                  ) : (
                    <NavLink
                      to={item.path}
                      exact="true"
                      className={style.navLink}
                      activeClassName={style.active}
                      onClick={handleClick}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ol>
          </span>
          <div className={style.menuIconWrapper} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeNavigation;
