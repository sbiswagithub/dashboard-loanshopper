"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../store/slices/sidebarSlice";

export default function LeftMenu() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <div className={`leftmenu-container ${isOpen ? "expanded" : "collapsed"}`}>
      <div className="w-100">
        <div className="leftmenu-header d-flex align-items-center justify-content-center mb-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={isOpen ? 24 : 70}
            height={isOpen ? 24 : 50}
            className="transition-logo"
            style={{ transition: "all 0.3s ease" }}
            unoptimized
          />
          {isOpen && (
            <h5 className="leftmenu-heading mb-0 text-white ms-2">
              LOAN SHOPPER
            </h5>
          )}
        </div>
        <ul className="nav flex-column mt-4 w-100 px-2">
          {/* <li className="nav-item mb-2">
            <Link
              href="/leads"
              className={`nav-link text-white d-flex leftmenu-link ${
                isOpen
                  ? "flex-row align-items-center"
                  : "flex-column align-items-center justify-content-center text-center"
              } ${pathname === "/leads" ? "fw-bold" : ""}`}
            >
              <i className="bi bi-person-lines-fill fs-5"></i>
              <span className="menu-text">{isOpen ? "Leads" : "Leads"}</span>
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              href="/properties"
              className={`nav-link text-white d-flex leftmenu-link ${
                isOpen
                  ? "flex-row align-items-center"
                  : "flex-column align-items-center justify-content-center text-center"
              } ${pathname === "/properties" ? "fw-bold" : ""}`}
            >
              <i className="bi bi-houses fs-5"></i>
              <span className="menu-text">
                {isOpen ? "Properties" : "Properties"}
              </span>
            </Link>
          </li> */}
          <li className="nav-item mb-2">
            <Link
              href="/profile"
              className={`nav-link text-white d-flex leftmenu-link ${
                isOpen
                  ? "flex-row align-items-center"
                  : "flex-column align-items-center justify-content-center text-center"
              } ${pathname === "/profile" ? "fw-bold" : ""}`}
            >
              <i className="bi bi-houses fs-5"></i>
              <span className="menu-text">
                {isOpen ? "Profile" : "Profile"}
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="toggle-btn-container mb-2">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="toggle-btn"
        >
          <i
            className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"}`}
          ></i>
        </button>
      </div>
    </div>
  );
}
