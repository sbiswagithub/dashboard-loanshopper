import React from "react";
import "../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Footer = () => {
  return (
    <footer className="bg-white sticky-footer">
      <div className="container my-auto">
        <div className="text-center my-auto copyright">
          <span className="footer-text">
            Copyright © Loan Analysis Solutions 2025
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;