import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";
import { useNavigate, Outlet } from "react-router-dom";
// import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import useWindowWidth from "../../hooks/use-window-width";
import sidebarValues from "./sidebarValues";
import useModal from "../../hooks/useModal";
import SettingsModal from "../settingsModal/SettingsModal";
const Logo = "./images/VisualumLogo.png";

export default function Dashboard(props: any) {
  let navigate = useNavigate();
  // const state = useSelector((state) => state.dashboard)

  function handleClick() {
    navigate("/");
  }
  const { isShowing, toggle } = useModal();

  const widthBigger = useWindowWidth(992);

  const dropDownItems = (
    <ul className="navbar-nav me-auto">
      {sidebarValues.map((item) => {
        return (
          <li className="nav-item dropdown-nav-link" key={item.value}>
            <a href={`/dashboard/${item.value}`}>{item.name}</a>
          </li>
        );
      })}
    </ul>
  );
  const nav = (
    <nav className="navbar navbar-light fixed-top navbar-expand-lg dashboard-nav">
      <div className="center-logo">
        <img
          className="mobile-floating-logo"
          src={Logo}
          alt="Visualum logo"
          onClick={handleClick}
        />
      </div>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mt-3 mt-lg-0"
          id="navbarTogglerDemo01"
        >
          {dropDownItems}
        </div>
        <div
          className="dashboard-navbar-button"
          style={{ padding: "5px", borderRadius: "5px" }}
          onClick={toggle}
        >
          <FontAwesomeIcon icon={faCog} />
        </div>
      </div>
    </nav>
  );

  return (
    <div className="d-flex flex-column">
      {isShowing && <SettingsModal toggle={toggle} />}
      {widthBigger ? <DashboardNav></DashboardNav> : <>{nav}</>}
      <div className="dashboard vh-100">
        <div className={`dashboard-container ${widthBigger ? "" : "mt-5"}`}>
          {widthBigger ? <DashboardSidebar page={props.page} /> : <></>}
          <div
            className={`main-content ${
              widthBigger ? "main-content-full" : "pt-3"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
