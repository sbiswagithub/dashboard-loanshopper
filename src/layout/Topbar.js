"use client";
import React from "react";
import Image from "next/image";
import { Images } from "@/assets/assets";

export default function TopBar() {
  return (
    <nav className="navbar navbar-expand bg-white shadow mb-4 topbar">
      <div className="container-fluid">
        <ul className="navbar-nav flex-nowrap ms-auto">
          <li className="nav-item dropdown d-sm-none no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-search"></i>
            </a>
            <div
              className="dropdown-menu p-3 dropdown-menu-end animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </li>

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link"
              href="#"
              id="alertsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="notification badge bg-danger badge-counter">
                3+
              </span>
              <i className="bi bi-bell fa-fw"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in p-0"
              aria-labelledby="alertsDropdown"
              style={{ width: "390px" }}
            >
              <div
                className="dropdown-header text-white fw-bold"
                style={{ backgroundColor: "#3a5cb4" }}
              >
                ALERTS CENTER
              </div>

              <div className="dropdown-item d-flex align-items-start px-3 py-3 border-bottom">
                <div className="me-3">
                  <div
                    className="icon-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-file-alt"></i>
                  </div>
                </div>
                <div className="small">
                  <div className="text-muted">December 12, 2019</div>
                  <div>A new monthly report is ready to download!</div>
                </div>
              </div>

              <div className="dropdown-item d-flex align-items-start px-3 py-3 border-bottom">
                <div className="me-3">
                  <div
                    className="icon-circle bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                </div>
                <div className="small">
                  <div className="text-muted">December 7, 2019</div>
                  <div>$290.29 has been deposited into your account!</div>
                </div>
              </div>

              <div className="dropdown-item d-flex align-items-start px-3 py-3 border-bottom">
                <div className="me-3">
                  <div
                    className="icon-circle bg-warning text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                </div>
                <div className="small">
                  <div className="text-muted">December 2, 2019</div>
                  <div className="message">
                    Spending Alert: We&apos;ve noticed unusually high spending
                    for your account.
                  </div>
                </div>
              </div>

              <div className="dropdown-item text-center small text-gray-500 py-2">
                Show All Alerts
              </div>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="d-none d-lg-inline me-2 text-gray-600 small">
                Valerie Luna
              </span>
              <Image
                src={Images.User}
                className="img-profile rounded-circle"
                width={32}
                height={32}
                alt="User"
                unoptimized
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="bi bi-person-fill fa-sm fa-fw me-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="bi bi-currency-dollar fa-sm fa-fw me-2 text-gray-400"></i>
                Billing
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <i className="bi bi-box-arrow-right fa-sm fa-fw me-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
