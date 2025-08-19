
"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import propertiesData from "../../data/properties.json";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addressSearchTerm, setAddressSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState([]);
  const [listingFilters, setListingFilters] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    setIsClient(true);
  }, []);

  useEffect(() => {
    let tempProperties = propertiesData.filter((property) => {
      const matchesSearchTerm =
        (property.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.mobile.includes(searchTerm)) &&
        property.address
          .toLowerCase()
          .includes(addressSearchTerm.toLowerCase());

      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(property.status);

      const matchesListing =
        listingFilters.length === 0 ||
        listingFilters.includes(property.listing);

      return matchesSearchTerm && matchesStatus && matchesListing;
    });

    setFilteredProperties(tempProperties);
    setCurrentPage(1);
  }, [searchTerm, addressSearchTerm, statusFilters, listingFilters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusFilterChange = (e) => {
    const { value, checked } = e.target;
    setStatusFilters((prevFilters) =>
      checked
        ? [...prevFilters, value]
        : prevFilters.filter((filter) => filter !== value)
    );
  };

  const handleListingFilterChange = (e) => {
    const { value, checked } = e.target;
    setListingFilters((prevFilters) =>
      checked
        ? [...prevFilters, value]
        : prevFilters.filter((filter) => filter !== value)
    );
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="container-fluid py-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <p className="text-primary m-0 fw-bold">Properties</p>

          <Link
            href="/propertie"
            className="btn btn-primary btn-sm d-flex align-items-center"
          >
            <i className="bi bi-plus-lg me-1"></i>
          </Link>
        </div>
        <div className="card-body">
          <div className="accordion mb-4" id="filtersAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFilters">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#filterSection"
                  aria-expanded="false"
                  aria-controls="filterSection"
                >
                  Filters
                </button>
              </h2>
              <div
                id="filterSection"
                className="accordion-collapse collapse"
                aria-labelledby="headingFilters"
                data-bs-parent="#filtersAccordion"
              >
                <div className="accordion-body">
                  <div className="row g-3">
                    <div className="col-md-6 col-lg-4">
                      <label
                        htmlFor="searchByNamePhone"
                        className="form-label visually-hidden"
                      >
                        Search by name or phone
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="search"
                        id="searchByNamePhone"
                        placeholder="Search by name or phone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 col-lg-4">
                      <label
                        htmlFor="searchByAddress"
                        className="form-label visually-hidden"
                      >
                        Search by property address
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="search"
                        id="searchByAddress"
                        placeholder="Search by property addres"
                        value={addressSearchTerm}
                        onChange={(e) => setAddressSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 col-lg-2">
                      <h6 className="fw-bold mb-2">Status</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="New"
                          id="statusCheck-New"
                          checked={statusFilters.includes("New")}
                          onChange={handleStatusFilterChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusCheck-New"
                        >
                          New
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Under Negotiation"
                          id="statusCheck-Negotiation"
                          checked={statusFilters.includes("Under Negotiation")}
                          onChange={handleStatusFilterChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusCheck-Negotiation"
                        >
                          Under Negotiation
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Sold"
                          id="statusCheck-Sold"
                          checked={statusFilters.includes("Sold")}
                          onChange={handleStatusFilterChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusCheck-Sold"
                        >
                          Sold
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-2">
                      <h6 className="fw-bold mb-2">Listing</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Off market"
                          id="listingCheck-OffMarket"
                          checked={listingFilters.includes("Off market")}
                          onChange={handleListingFilterChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="listingCheck-OffMarket"
                        >
                          Off market
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Listed"
                          id="listingCheck-Listed"
                          checked={listingFilters.includes("Listed")}
                          onChange={handleListingFilterChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="listingCheck-Listed"
                        >
                          Listed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-striped table-sm my-0">
              <thead className="table-light">
                <tr>
                  <th>Listed By</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Listing</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProperties.length > 0 ? (
                  currentProperties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.listedBy}</td>
                      <td>{property.address}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            property.status === "New"
                              ? "info"
                              : property.status === "Under Negotiation"
                              ? "warning"
                              : property.status === "Sold"
                              ? "success"
                              : "secondary"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>
                      <td>{property.listing}</td>
                      <td>
                        <Link
                          href={`/properties/${property.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No properties found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="row mt-3 d-flex align-items-center">
            <div className="col-md-6">
              <label className="form-label d-flex align-items-center">
                Show&nbsp;
                <select
                  className="form-select form-select-sm w-auto mx-2"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </label>
            </div>
            <div className="col-md-6">
              <nav className="d-flex justify-content-md-end justify-content-center">
                <ul className="pagination mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      aria-label="Previous"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(currentPage - 1);
                      }}
                    >
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          paginate(index + 1);
                        }}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      aria-label="Next"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(currentPage + 1);
                      }}
                    >
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <p className="text-md-end text-center mt-2 mb-0 text-muted small">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredProperties.length)} of{" "}
                {filteredProperties.length} entries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;